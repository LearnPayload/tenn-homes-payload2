import type { CollectionConfig, FieldHook } from 'payload'
const formatFullAddress: FieldHook = async ({ data }) => {
  const parts = []
  if (data?.address?.street) parts.push(data.address.street)
  if (data?.address?.location?.city) parts.push(data.address.location.city)
  if (data?.address?.location?.state_abbr) parts.push(data.address.location.state_abbr)
  if (data?.address?.location?.zip) parts.push(data.address.location.zip)
  return parts.join(', ')
}

export const Properties: CollectionConfig = {
  slug: 'properties',
  admin: {
    useAsTitle: 'fullAddress',
    defaultColumns: ['fullAddress', 'price', 'listingStatus'],
    preview: ({ id }) => `http://localhost:3000/properties/${id}`,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },

    {
      name: 'fullAddress',
      label: false,
      type: 'text',
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            // Mutate the sibling data to prevent DB storage
            // eslint-disable-next-line no-param-reassign
            siblingData.fullAddress = undefined
          },
        ],
        afterRead: [formatFullAddress],
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
      name: 'address',
      type: 'group',
      fields: [
        {
          name: 'street',
          type: 'text',
          required: true,
          label: 'Street Address',
        },
        {
          name: 'location',
          type: 'relationship',
          relationTo: 'locations',

          required: true,
          admin: {
            sortOptions: 'city',
            description: 'Select the location for this property.',
          },
        },
      ],
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
    {
      name: 'details',
      type: 'group',
      fields: [
        {
          name: 'bedrooms',
          type: 'number',
        },
        {
          name: 'bathrooms',
          type: 'number',
        },
        {
          name: 'squareFeet',
          type: 'number',
        },
        {
          name: 'lotSize',
          type: 'number',
        },
        {
          name: 'yearBuilt',
          type: 'number',
        },
      ],
    },
  ],
}
