// src/collections/Features.ts

import { CollectionConfig } from 'payload'

export const Features: CollectionConfig = {
  slug: 'features',
  admin: {
    useAsTitle: 'name',
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Feature Name',
      admin: {
        description: 'Name of the feature (e.g., "Hardwood Floors", "Swimming Pool")',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Interior',
          value: 'interior',
        },
        {
          label: 'Exterior',
          value: 'exterior',
        },
        {
          label: 'Community',
          value: 'community',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
      admin: {
        description: 'Category of the feature',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Optional description of the feature',
      },
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Optional icon name (for frontend display)',
      },
    },
  ],
}

export default Features
