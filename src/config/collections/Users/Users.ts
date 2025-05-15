import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'user', 'agent'],
      defaultValue: 'user',
      required: true,
    },
    // Email added by default
    // Add more fields as needed
  ],
}
