import { Payload } from 'payload'

export async function seedProperties(payload: Payload): Promise<void> {
  const sampleProperties = [
    {
      title: 'Modern Downtown Condo',
      address: {
        street: '123 Main St',
        location: 0, // This will be populated with a location ID
      },
      price: 350000,
      listingStatus: 'forsale' as const,
      features: [] as number[], // This will be populated with feature IDs
      details: {
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1200,
        lotSize: 0,
        yearBuilt: 2020,
      },
    },
    {
      title: 'Suburban Family Home',
      address: {
        street: '456 Oak Lane',
        location: 0, // This will be populated with a location ID
      },
      price: 450000,
      listingStatus: 'forsale' as const,
      features: [] as number[], // This will be populated with feature IDs
      details: {
        bedrooms: 4,
        bathrooms: 3,
        squareFeet: 2500,
        lotSize: 0.5,
        yearBuilt: 2015,
      },
    },
    {
      title: 'Luxury Waterfront Estate',
      address: {
        street: '789 Lake View Dr',
        location: 0, // This will be populated with a location ID
      },
      price: 850000,
      listingStatus: 'forsale' as const,
      features: [] as number[], // This will be populated with feature IDs
      details: {
        bedrooms: 5,
        bathrooms: 4,
        squareFeet: 4000,
        lotSize: 1.2,
        yearBuilt: 2018,
      },
    },
  ]

  // Get all locations to randomly assign to properties
  const locations = await payload.find({
    collection: 'locations',
    limit: 100,
  })

  // Get all features to randomly assign to properties
  const features = await payload.find({
    collection: 'features',
    limit: 100,
  })

  for (const property of sampleProperties) {
    // Randomly select a location
    const randomLocation = locations.docs[Math.floor(Math.random() * locations.docs.length)]
    property.address.location = randomLocation.id

    // Randomly select 2-4 features
    const numFeatures = Math.floor(Math.random() * 3) + 2
    const randomFeatures = features.docs.sort(() => 0.5 - Math.random()).slice(0, numFeatures)
    property.features = randomFeatures.map((feature) => feature.id)

    await payload.create({
      collection: 'properties',
      data: property,
    })
  }

  console.log(`Seeded ${sampleProperties.length} properties`)
}
