import type { CollectionConfig, FieldHook } from "payload"

const formatLocation: FieldHook = async ({ data }) => {
  if (!data) return ""
  return `${data.city}, ${data.state_abbr} ${data.zip}`
}

export const Locations: CollectionConfig = {
  slug: "locations",
  labels: {
    singular: "Location",
    plural: "Locations",
  },
  admin: {
    useAsTitle: "formattedLocation",
    listSearchableFields: ["city", "state_abbr", "state_name", "zip", "county"],
  },
  fields: [
    {
      name: "formattedLocation",
      type: "text",
      label: "Location",
      admin: {
        hidden: true,
      },
      hooks: {
        afterRead: [formatLocation],
      },
    },
    {
      name: "zip",
      type: "text",
      unique: true,
      required: true,
      label: "Zip Code",
    },
    {
      type: "row",
      fields: [
        {
          name: "city",
          type: "text",
          required: true,
          admin: {
            description: "City of the zip code",
          },
          label: "City",
        },
        {
          name: "slug",
          type: "text",
          required: true,
          admin: {
            readOnly: true,
          },
          label: "City Slug",
        },
        {
          name: "state_abbr",
          type: "text",
          required: true,
          admin: {
            description: "State abbreviation of the zip code",
          },
          label: "State Abbreviation",
        },
        {
          name: "state_name",
          type: "text",
          required: true,
          admin: {
            description: "State name of the zip code",
          },
          label: "State Name",
        },
        {
          name: "county",
          type: "text",
          required: true,
          admin: {
            description: "County of the zip code",
          },
          label: "County",
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "latitude",
          type: "number",
        },
        {
          name: "longitude",
          type: "number",
        },
      ],
    },
    {
      name: "est_population",
      type: "number",
      admin: {
        description: "Estimated population of the zip code",
      },
      label: "Estimated Population",
    },
  ],
}
