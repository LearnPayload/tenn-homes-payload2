import { generatePrimaryKey } from "@/lib/generate-primary-key"
import routes from "@/lib/routes"
import slugify from "slugify"
import { AfterReadHook } from "node_modules/payload/dist/collections/config/types"
import type { CollectionConfig, PayloadRequest } from "payload"
import type { Location } from "@/payload-types"
import type { JSONSchema4 } from "json-schema"
import { listingStatusOptions } from "./listing-status-map"
import { propertyTypeOptions } from "./property-type-options"
import { heatingTypeOptions } from "./heating-options"

const formatAddress: AfterReadHook = async ({ doc }) => {
  return {
    ...doc,
    //IL/Chicago/1620-S-Michigan-Ave-60616/unit-907/home/21655306
    full_address: `${doc.street}, ${doc.location.city}, ${doc.location.state_abbr} ${doc.location.zip}`,

    address: {
      street: doc.street,
      city: doc.location.city,
      state: doc.location.state_name,
      state_abbr: doc.location.state_abbr,
      zip: doc.location.zip,
      full_address: `${doc.street}, ${doc.location.city}, ${doc.location.state_abbr} ${doc.location.zip}`,
    },
  }
}

const generateUrl = async (id: string, req: PayloadRequest) => {
  console.log("generating url", req)
  const property = await req.payload.findByID({ collection: "properties", id })
  const location = property.location as Location
  const fullAddress = [property.street, location.city, location.state_abbr, location.zip].map((l) =>
    slugify(`${l}`, { lower: true }),
  )

  return (
    req.payload.config.serverURL +
    routes("property.show", {
      id,
      full_address: fullAddress.join("/"),
    })
  )
}
export const Properties: CollectionConfig = {
  slug: "properties",
  admin: {
    useAsTitle: "street",
    defaultColumns: ["primaryPhoto", "street", "location", "price", "listingStatus"],
    preview: (doc, options) => generateUrl(String(doc.id), options.req as PayloadRequest),
  },

  fields: [
    {
      name: "id",
      type: "text",
      required: true,
      unique: true,
      admin: {
        disabled: true,
      },
      defaultValue: generatePrimaryKey.bind(null, 8),
    },

    {
      type: "tabs",
      tabs: [
        {
          label: "General",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              name: "description",
              type: "textarea",
              required: true,
            },
            {
              name: "price",
              type: "number",
            },
            {
              name: "listingStatus",
              type: "select",
              required: true,
              options: listingStatusOptions,
            },
            {
              name: "details",
              type: "group",
              fields: [
                {
                  name: "bedrooms",
                  type: "number",
                },
                {
                  name: "bathrooms",
                  type: "number",
                },
                {
                  name: "squareFeet",
                  type: "number",
                },
                {
                  name: "lotSize",
                  type: "number",
                },
                {
                  name: "yearBuilt",
                  type: "number",
                },
                {
                  name: "propertyType",
                  type: "select",
                  options: propertyTypeOptions,
                },
                {
                  name: "heatingType",
                  type: "select",
                  options: heatingTypeOptions,
                },
              ],
            },
          ],
        },
        {
          label: "Photos",
          fields: [
            {
              name: "photos",
              type: "upload",
              relationTo: "media",
              hasMany: true,
            },
          ],
        },
        {
          label: "Location",
          fields: [
            {
              name: "street",
              type: "text",
              required: true,
              label: "Street Address",
            },

            {
              name: "point",
              type: "point",
              required: true,
              admin: {
                description: "Select the location on the map.",
              },
            },

            {
              name: "address",
              type: "text",
              required: true,
              validate: () => true,
              hasMany: false,
              admin: {
                hidden: true,
              },
              typescriptSchema: [
                () => {
                  const address: JSONSchema4 = {
                    type: "object",
                    properties: {
                      street: { type: "string" },
                      city: { type: "string" },
                      state: { type: "string" },
                      state_abbr: { type: "string" },
                      zip: { type: "string" },
                      full_address: {
                        type: "string",
                      },
                    },
                    required: ["street", "city", "state", "state_abbr", "zip", "full_address"],
                  }

                  return address
                },
              ],
            },
            {
              name: "location",
              type: "relationship",
              relationTo: "locations",
              required: true,
              hasMany: false,
            },
          ],
        },
        {
          label: "Features",
          fields: [
            {
              name: "features",
              type: "relationship",
              relationTo: "features",
              hasMany: true,
              admin: {
                description: "Select the features for this property.",
              },
            },
          ],
        },
      ],
    },
    {
      name: "agent",
      type: "relationship",
      relationTo: "agents",
      hasMany: false,
      admin: {
        position: "sidebar",
      },
    },
  ],
  hooks: {
    afterRead: [formatAddress],
  },
}
