import type { CollectionConfig } from 'payload'
import { specializations } from './specializations'
import { stateOptions } from '@/config/helpers/state-options'
import { customPrimaryKey } from '@/config/helpers/custom-primary-key'
export const Agents: CollectionConfig = {
  slug: 'agents',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'phone'],
  },
  auth: true,
  fields: [
    ...customPrimaryKey,
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Profile',
          fields: [
            {
              name: 'firstName',
              type: 'text',
              required: true,
            },
            {
              name: 'lastName',
              type: 'text',
              required: true,
            },
            {
              name: 'fullName',
              type: 'text',
              virtual: true,
              admin: {
                hidden: true, // hides the field from the admin panel
              },
              hooks: {
                beforeChange: [
                  ({ siblingData }) => {
                    // ensures data is not stored in DB
                    delete siblingData['fullName']
                  },
                ],
                afterRead: [
                  ({ data }) => {
                    if (!data) return null
                    return `${data.firstName} ${data.lastName}`
                  },
                ],
              },
            },
            {
              name: 'initials',
              type: 'text',
              virtual: true,
              admin: {
                hidden: true, // hides the field from the admin panel
              },
              hooks: {
                beforeChange: [
                  ({ siblingData }) => {
                    // ensures data is not stored in DB
                    delete siblingData['initials']
                  },
                ],
                afterRead: [
                  ({ data }) => {
                    if (!data) return null
                    return `${data.firstName.charAt(0)}${data.lastName.charAt(0)}`
                  },
                ],
              },
            },
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              admin: {
                description: 'e.g., "Realtor", "Senior Agent", "Broker"',
              },
            },
            {
              name: 'bio',
              type: 'richText',
              admin: {
                description: 'Add a short bio',
              },
            },
            {
              name: 'yearsExperience',
              type: 'number',
              label: 'Years of Experience',
            },
            {
              name: 'specializations',
              type: 'select',
              hasMany: true,
              options: specializations,
            },
            {
              name: 'profilePhoto',
              type: 'upload',
              relationTo: 'media',
              filterOptions: {
                mimeType: { contains: 'image' },
              },
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'phone',
              type: 'text',
              admin: {
                description: 'Format: (555) 555-5555',
              },
            },
            {
              name: 'officePhone',
              type: 'text',
            },
            {
              name: 'contactEmail', // Separate from auth email
              type: 'email',
              admin: {
                description: 'Public-facing email (can be different from login email)',
              },
            },
          ],
        },
        {
          label: 'Licenses',
          fields: [
            {
              name: 'licenses',
              type: 'array',
              fields: [
                {
                  name: 'licenseNumber',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'state',
                  type: 'select',
                  options: stateOptions,
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Listings',
          fields: [
            {
              name: 'relatedListings',
              type: 'join',
              collection: 'properties',
              on: 'agent',
            },
          ],
        },
      ],
    },
  ],
}
