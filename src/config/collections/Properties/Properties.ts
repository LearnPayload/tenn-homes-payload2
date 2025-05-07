import type { JSONSchema4 } from 'json-schema'
import type { AfterReadHook } from 'node_modules/payload/dist/collections/config/types'
import type { CollectionConfig } from 'payload'

const formatAddress: AfterReadHook = async ({ doc }) => {
  if (!doc) return null

  if (doc.location) {
    return {
      ...doc,
      formattedAddress: `${doc.street}, ${doc.location.city}, ${doc.location.state_abbr} ${doc.location.zip}`,
      address: {
        street: doc.street,
        city: doc.location.city,
        state: doc.location.state_abbr,
        zip: doc.location.zip,
      },
    }
  }

  return null
}
export const Properties: CollectionConfig = {
  slug: 'properties',
  admin: {
    useAsTitle: 'street',
    defaultColumns: ['title', 'street', 'location', 'price', 'listingStatus'],
    preview: ({ id }) => `http://localhost:3000/properties/${id}`,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'street',
      type: 'text',
      required: true,
      label: 'Street Address',
    },
    {
      name: 'formattedAddress',
      type: 'text',
      typescriptSchema: [
        () => {
          const address: JSONSchema4 = {
            type: 'string',
            title: 'Formatted Address',
          }

          return address
        },
      ],
      admin: {
        hidden: true,
      },
    },
    {
      name: 'address',
      type: 'text',
      typescriptSchema: [
        () => {
          const address: JSONSchema4 = {
            type: 'object',
            title: 'Address',
            properties: {
              street: { type: 'string' },
              city: { type: 'string' },
              state: { type: 'string' },
              state_abbr: { type: 'string' },
              zip: { type: 'string' },
            },
            required: true,
          }

          return address
        },
      ],
      admin: {
        hidden: true,
      },
    },
    {
      name: 'location',
      type: 'relationship',
      relationTo: 'locations',
      required: true,
      hasMany: false,
      admin: {
        description: 'Select a location for this property.',
      },
    },
    {
      name: 'price',
      type: 'number',
    },
    {
      name: 'listingStatus',
      type: 'select',
      required: true,
      options: [
        {
          label: 'For Sale',
          value: 'forsale',
        },
        {
          label: 'Offer Pending',
          value: 'pending',
        },
        {
          label: 'Under Contract',
          value: 'contract',
        },
        {
          label: 'Sold',
          value: 'sold',
        },
        {
          label: 'Not For Sale',
          value: 'notforsale',
        },
      ],
    },
    {
      name: 'features',
      type: 'relationship',
      relationTo: 'features',
      hasMany: true,
      admin: {
        description: 'Select the features for this property.',
      },
    },
  ],
  hooks: {
    afterRead: [formatAddress],
  },
}
