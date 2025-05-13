// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './config/collections/Users/Users'
import { Media } from './config/collections/Media/Media'
import { Locations } from './config/collections/Locations/Locations'
import { Properties } from './config/collections/Properties/Properties'
import { Features } from './config/collections/Features/Features'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const DATABASE_URL = process.env.DATABASE_URI + '_video_31c'

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Locations, Properties, Features],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: DATABASE_URL,
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
