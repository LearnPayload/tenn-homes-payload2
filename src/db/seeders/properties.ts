import { faker } from '@faker-js/faker'
import { Payload } from 'payload'
import { Property } from '../../payload-types'

export const seedProperties = async (payload: Payload): Promise<void> => {
  // Get all features and zipcodes for relationships
  const features = await payload.find({
    collection: 'features',
    limit: 100,
  })

  const zipcodes = await payload.find({
    collection: 'zipcodes',
    limit: 100,
  })

  if (!features.docs.length || !zipcodes.docs.length) {
    console.log('No features or zipcodes found. Please seed those collections first.')
    return
  }

  const properties: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>[] = []

  // Generate 50 properties
  for (let i = 0; i < 50; i++) {
    const propertyType = faker.helpers.arrayElement([
      'single-family',
      'condo',
      'townhouse',
      'multi-family',
      'land',
      'commercial',
    ])

    const property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'> = {
      title: faker.helpers.arrayElement([
        `Stunning ${propertyType.replace('-', ' ')} in ${faker.location.city()}`,
        `Beautiful ${propertyType.replace('-', ' ')} with Mountain Views`,
        `Luxury ${propertyType.replace('-', ' ')} in ${faker.location.city()} Neighborhood`,
        `Spacious ${propertyType.replace('-', ' ')} with Modern Amenities`,
        `Charming ${propertyType.replace('-', ' ')} in ${faker.location.city()} Area`,
        `Elegant ${propertyType.replace('-', ' ')} with ${faker.number.int({ min: 2, max: 5 })} Bedrooms`,
        `Prime ${propertyType.replace('-', ' ')} Location in ${faker.location.city()}`,
        `Exclusive ${propertyType.replace('-', ' ')} with ${faker.number.int({ min: 2, max: 4 })} Bathrooms`,
        `Contemporary ${propertyType.replace('-', ' ')} in ${faker.location.city()} Suburbs`,
        `Family-Friendly ${propertyType.replace('-', ' ')} with Large Yard`,
      ]),
      price: faker.number.int({ min: 100000, max: 2000000 }),
      listingStatus: faker.helpers.arrayElement([
        'for-sale',
        'offer-pending',
        'under-contract',
        'sold',
        'not-for-sale',
      ]),
      description: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: faker.lorem.paragraphs(3),
                  version: 1,
                },
              ],
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      address: {
        street: faker.location.streetAddress(),
        zipCode: faker.helpers.arrayElement(zipcodes.docs).id,
      },
      details: {
        bedrooms: faker.number.int({ min: 1, max: 6 }),
        bathrooms: faker.number.int({ min: 1, max: 4 }),
        squareFeet: faker.number.int({ min: 800, max: 5000 }),
        propertyType,
        lotSize: `${faker.number.int({ min: 1000, max: 10000 })} sq ft`,
        yearBuilt: faker.number.int({ min: 1800, max: new Date().getFullYear() }),
        heating: faker.helpers.arrayElement([
          'central',
          'radiator',
          'baseboard',
          'forced-air',
          'heat-pump',
          'none',
        ]),
      },
      coordinates: {
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
      },
      interiorFeatures: faker.helpers
        .arrayElements(
          features.docs.filter((f) => f.category === 'interior'),
          { min: 2, max: 8 },
        )
        .map((f) => f.id),
      exteriorFeatures: faker.helpers
        .arrayElements(
          features.docs.filter((f) => f.category === 'exterior'),
          { min: 2, max: 8 },
        )
        .map((f) => f.id),
    }

    properties.push(property)
  }

  // Create properties in batches
  for (const property of properties) {
    try {
      await payload.create({
        collection: 'properties',
        data: property,
      })
    } catch (error) {
      console.error('Error creating property:', error)
    }
  }

  console.log(`✅ Seeded ${properties.length} properties`)
}
