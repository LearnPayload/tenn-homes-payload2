import type { JSONSchema4 } from 'json-schema'
import type { CollectionConfig } from 'payload'

export const Properties: CollectionConfig = {
  slug: 'properties',
  admin: {
    useAsTitle: 'title',
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
              formatted: { type: 'string' },
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
      maxDepth: 2,
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
    afterRead: [
      ({ doc }) => {
        if (!doc) return
        return {
          ...doc,
          address: {
            street: doc.street,
            city: doc.location.city,
            state_abbr: doc.location.state_abbr,
            state: doc.location.state_name,
            zip: doc.location.zip,
            formatted: `${doc.street}, ${doc.location.city}, ${doc.location.state_abbr} ${doc.location.zip}`,
          },
        }
      },
    ],
  },
}
