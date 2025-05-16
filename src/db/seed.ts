import { drizzle } from 'drizzle-orm/node-postgres'
import { seedLocations } from './seeders/locations'
import { seedFeatures } from './seeders/features'
import { seedProperties } from './seeders/properties'
import { seedUsers } from './seeders/users'
import { seedMedia } from './seeders/media'
import { getPayloadClient } from './client'
import { reset } from 'drizzle-seed'
import { seedAgents } from './seeders/agents'
import { DATABASE_URL } from '@/config/env'
import { sql } from 'drizzle-orm'

async function main() {
  console.log(`\n== Seeding database ==\n`)

  console.log(`\n[Resetting database...]`)
  const db = drizzle(DATABASE_URL)
  const payload = await getPayloadClient()
  const schema = payload.db.schema
  await reset(db, schema)

  console.log(`\n[Seeding media...]\n`)
  await seedMedia(payload)

  console.log(`\n[Seeding users...]\n`)
  await seedUsers(payload)

  console.log(`\n[Seeding locations...]\n`)
  await seedLocations(payload)

  console.log(`\n[Seeding features...]\n`)
  await seedFeatures(payload)

  console.log(`\n[Seeding agents...]\n`)
  await seedAgents(payload)

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
