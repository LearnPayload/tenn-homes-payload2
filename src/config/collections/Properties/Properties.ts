// src/collections/Properties.ts

import { CollectionConfig } from 'payload'

export const Properties: CollectionConfig = {
  slug: 'properties',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'price', 'details.propertyType', 'listingStatus'],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basic Information',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Property Title',
            },
            {
              name: 'price',
              type: 'number',
              required: true,
              min: 0,
              admin: {
                description: 'Price in USD',
              },
            },
            {
              name: 'listingStatus',
              type: 'select',
              required: true,
              defaultValue: 'for-sale',
              options: [
                {
                  label: 'For Sale',
                  value: 'for-sale',
                },
                {
                  label: 'Offer Pending',
                  value: 'offer-pending',
                },
                {
                  label: 'Under Contract',
                  value: 'under-contract',
                },
                {
                  label: 'Sold',
                  value: 'sold',
                },
                {
                  label: 'Not For Sale',
                  value: 'not-for-sale',
                },
              ],
            },
            {
              name: 'description',
              type: 'richText',
              required: true,
            },
          ],
        },
        {
          label: 'Location',
          fields: [
            {
              name: 'address',
              type: 'group',
              label: 'Property Address',
              fields: [
                {
                  name: 'street',
                  type: 'text',
                  required: true,
                  label: 'Street Address',
                },
                {
                  name: 'zipCode',
                  type: 'relationship',
                  relationTo: 'zipcodes',
                  required: true,
                  hasMany: false,
                  admin: {
                    description: 'Select a ZIP code for this property',
                    allowEdit: false,
                  },
                },
                // These fields will be populated by the afterRead hook
                // from the ZIP code relationship
              ],
            },
            {
              name: 'coordinates',
              type: 'group',
              label: 'Property Coordinates',
              admin: {
                description: 'Latitude and longitude for map display',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'latitude',
                      type: 'number',
                      required: true,
                      min: -90,
                      max: 90,
                      admin: {
                        width: '50%',
                        description: 'Latitude (-90 to 90)',
                      },
                    },
                    {
                      name: 'longitude',
                      type: 'number',
                      required: true,
                      min: -180,
                      max: 180,
                      admin: {
                        width: '50%',
                        description: 'Longitude (-180 to 180)',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Property Details',
          fields: [
            {
              name: 'details',
              type: 'group',
              label: 'Property Details',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'bedrooms',
                      type: 'number',
                      required: true,
                      min: 0,
                      admin: {
                        width: '33%',
                      },
                    },
                    {
                      name: 'bathrooms',
                      type: 'number',
                      required: true,
                      min: 0,
                      admin: {
                        width: '33%',
                      },
                    },
                    {
                      name: 'squareFeet',
                      type: 'number',
                      label: 'Square Feet',
                      required: true,
                      min: 0,
                      admin: {
                        width: '33%',
                      },
                    },
                  ],
                },
                {
                  name: 'propertyType',
                  type: 'select',
                  required: true,
                  options: [
                    {
                      label: 'Single Family Home',
                      value: 'single-family',
                    },
                    {
                      label: 'Condo',
                      value: 'condo',
                    },
                    {
                      label: 'Townhouse',
                      value: 'townhouse',
                    },
                    {
                      label: 'Multi-family',
                      value: 'multi-family',
                    },
                    {
                      label: 'Land',
                      value: 'land',
                    },
                    {
                      label: 'Commercial',
                      value: 'commercial',
                    },
                  ],
                },
                {
                  name: 'lotSize',
                  type: 'text',
                  label: 'Lot Size',
                },
                {
                  name: 'yearBuilt',
                  type: 'number',
                  min: 1800,
                  max: new Date().getFullYear() + 1,
                },
                {
                  name: 'heating',
                  type: 'select',
                  options: [
                    {
                      label: 'Central',
                      value: 'central',
                    },
                    {
                      label: 'Radiator',
                      value: 'radiator',
                    },
                    {
                      label: 'Baseboard',
                      value: 'baseboard',
                    },
                    {
                      label: 'Forced Air',
                      value: 'forced-air',
                    },
                    {
                      label: 'Heat Pump',
                      value: 'heat-pump',
                    },
                    {
                      label: 'None',
                      value: 'none',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Features',
          fields: [
            {
              name: 'interiorFeatures',
              type: 'relationship',
              relationTo: 'features',
              hasMany: true,
              filterOptions: {
                category: {
                  equals: 'interior',
                },
              },
              admin: {
                description: 'Select interior features of this property',
              },
            },
            {
              name: 'exteriorFeatures',
              type: 'relationship',
              relationTo: 'features',
              hasMany: true,
              filterOptions: {
                category: {
                  equals: 'exterior',
                },
              },
              admin: {
                description: 'Select exterior features of this property',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default Properties
