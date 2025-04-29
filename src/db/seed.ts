import { seedZipCodes } from './seeders/zipcodes'
import { getPayload, Payload } from 'payload'
import config from '../payload.config'
import { seedFeatures } from './seeders/features'
import { seedProperties } from './seeders/properties'

async function seed() {
  console.log('Seeding database...')

  const payload = await getPayload({ config })

  console.log('Clearing collections...')
  await clearCollections(payload)

  await seedZipCodes(payload)
  await seedFeatures(payload)
  await seedProperties(payload)
}

function clearCollections(payload: Payload) {
  return Promise.all([
    payload.delete({ collection: 'zipcodes', where: {} }),
    payload.delete({ collection: 'features', where: {} }),
    payload.delete({ collection: 'properties', where: {} }),
  ])
}

seed()
  .then(() => {
    console.log('Database seeded successfully')
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
