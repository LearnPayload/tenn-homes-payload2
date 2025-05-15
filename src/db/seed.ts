import { drizzle } from 'drizzle-orm/node-postgres'
import { seedLocations } from './seeders/locations'
import { seedFeatures } from './seeders/features'
import { seedProperties } from './seeders/properties'
import { seedUsers } from './seeders/users'
import { seedMedia } from './seeders/media'
import { getPayloadClient } from './client'
import { reset } from 'drizzle-seed'

async function main() {
  console.log(`\n== Seeding database ==\n`)

  const payload = await getPayloadClient()
  console.log(`\n[Resetting database...]`)
  const db = drizzle(payload.db.poolOptions.connectionString!)
  await reset(db, payload.db.schema)

  console.log(`\n[Seeding media...]\n`)
  await seedMedia(payload)

  console.log(`\n[Seeding users...]\n`)
  await seedUsers(payload)

  console.log(`\n[Seeding locations...]\n`)
  await seedLocations(payload)

  console.log(`\n[Seeding features...]\n`)
  await seedFeatures(payload)

  console.log(`\n[Seeding properties...]\n`)
  await seedProperties(payload)
}

main()
  .then(() => {
    console.log(`\nDatabase seeded successfully\n`)
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
