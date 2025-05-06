import type { CollectionConfig, FieldHook } from 'payload'

const formatLocation: FieldHook = async ({ data }) => {
  const parts = []
  if (data?.city) parts.push(data.city)
  if (data?.state_abbr) parts.push(data.state_abbr)
  if (data?.zip) parts.push(data.zip)
  return parts.join(', ')
}

export const Locations: CollectionConfig = {
  slug: 'locations',
  labels: {
    singular: 'Location',
    plural: 'Locations',
  },
  admin: {
    useAsTitle: 'location',
    listSearchableFields: ['location', 'city', 'state_abbr', 'zip'],
  },
  fields: [
    {
      name: 'location',
      label: false,
      type: 'text',
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            // Mutate the sibling data to prevent DB storage
            // eslint-disable-next-line no-param-reassign
            siblingData.location = undefined
          },
        ],
        afterRead: [formatLocation],
      },
      access: {
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
      },
    },

    {
      type: 'row',
      fields: [
        {
          name: 'city',
          type: 'text',
          required: true,
        },
        {
          name: 'state',
          type: 'text',
        },
        {
          name: 'state_abbr',
          type: 'text',
        },
        {
          name: 'zip',
          type: 'text',
        },
      ],
    },
  ],
}
