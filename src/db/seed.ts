import { drizzle } from 'drizzle-orm/node-postgres'
import { reset } from 'drizzle-seed'

import { getPayload } from 'payload'
import config from '../payload.config'
import { seedLocations } from './seeders/locations'
import { seedFeatures } from './seeders/features'
import { seedProperties } from './seeders/properties'
import { seedUsers } from './seeders/users'
async function main() {
  console.log(`\n== Seeding database ==\n`)

  const db = drizzle(process.env.DATABASE_URI + '_pdp'!)

  const payload = await getPayload({ config })

  console.log(`\n[Resetting database...]`)
  await reset(db, payload.db.schema)

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
