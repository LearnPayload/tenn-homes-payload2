import { heatingTypeOptions } from "@/config/collections/Properties/heating-options"
import { propertyTypeOptions } from "@/config/collections/Properties/property-type-options"
import { Property } from "@/payload-types"
import { local } from "@/repository"
import { faker } from "@faker-js/faker"

import { Payload } from "payload"

export async function seedProperties(payload: Payload): Promise<void> {
  // Get all locations to randomly assign to properties
  const locations = await local.location.getAll()
  const locationDocs = locations?.docs || []

  // Get all features to randomly assign to properties
  const features = await payload.find({
    collection: "features",
    limit: 100,
  })

  // Get all media to randomly assign to properties
  const media = await payload.find({
    collection: "media",
    limit: 100,
    where: {
      filename: {
        contains: "property_",
      },
    },
  })

  const agents = await payload.find({
    collection: "agents",
    limit: 100,
  })

  const titleAdjectives = [
    "Modern",
    "Suburban",
    "Luxury",
    "Charming",
    "Cozy",
    "Stylish",
    "Elegant",
    "Cozy",
    "Stylish",
    "Elegant",
  ]
  const titleNouns = [
    "Condo",
    "Family Home",
    "Waterfront Estate",
    "Mountain View Home",
    "Cottage",
    "Apartment",
    "Mansion",
    "Cozy Cottage",
    "Apartment",
    "Mansion",
  ]
  const titleRegions = [
    "Smoky Mountains",
    "Blue Ridge Mountains",
    "Appalachian Mountains",
    "Rocky Mountains",
    "Ozark Mountains",
    "Piedmont Mountains",
    "Appalachian Plateau",
    "Ozark Plateau",
    "Piedmont Plateau",
    "Appalachian Plateau",
  ]

  const sampleProperties: Omit<Property, "id" | "updatedAt" | "createdAt">[] = Array.from(
    { length: 100 },
    () => {
      const location = faker.helpers.arrayElement(locationDocs).original
      const street = faker.location.streetAddress()
      const title = `${faker.helpers.arrayElement(titleAdjectives)} ${faker.helpers.arrayElement(titleNouns)} in the ${faker.helpers.arrayElement(titleRegions)}`
      return {
        title,
        description: faker.lorem.paragraph(),
        street,
        location: location.id,
        address: {
          street,
          city: location.city || "",
          state: location.state_name || "",
          state_abbr: location.state_abbr || "",
          zip: location.zip || "",
          full_address: `${street}, ${location.city || ""}, ${location.state_abbr || ""} ${location.zip || ""}`,
        },
        price: faker.number.int({ min: 100000, max: 1000000 }),
        listingStatus: faker.helpers.weightedArrayElement([
          { weight: 5, value: "forsale" },
          { weight: 2, value: "pending" },
          { weight: 2, value: "contract" },
          { weight: 3, value: "sold" },
          { weight: 1, value: "notforsale" },
        ]),
        features: faker.helpers.arrayElements(
          features.docs.map((feature) => feature.id),
          {
            min: 5,
            max: features.docs.length,
          },
        ),
        details: {
          bedrooms: faker.number.int({ min: 1, max: 5 }),
          bathrooms: faker.number.int({ min: 1, max: 3 }),
          squareFeet: faker.number.int({ min: 1000, max: 5000 }),
          lotSize: faker.number.int({ min: 0, max: 10 }),
          yearBuilt: faker.number.int({ min: 1900, max: 2024 }),
          propertyType: faker.helpers.arrayElement(propertyTypeOptions).value,
          heatingType: faker.helpers.arrayElement(heatingTypeOptions).value,
        },
        photos: faker.helpers.arrayElements(
          media.docs.map((photo) => photo.id),
          {
            min: 5,
            max: 10,
          },
        ),
        agent: faker.helpers.arrayElement(agents.docs).id,
      }
    },
  )

  for (const property of sampleProperties) {
    await local.property.create(property)
  }

  console.log(`Seeded ${sampleProperties.length} properties`)
}
