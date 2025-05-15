import mime from 'mime-types'
import path from 'path'
import fs from 'fs'
import { BasePayload } from 'payload'

export const seedMedia = async (payload: BasePayload) => {
  const mediaFolder = path.resolve('./media')
  const mediaFiles = fs.readdirSync(mediaFolder, { withFileTypes: true })

  for (const file of mediaFiles) {
    const type = mime.lookup(file.name)
    if (file.isDirectory() || (type && !type.startsWith('image')) || !type) {
      continue
    }
    const stats = fs.statSync(path.resolve(mediaFolder, file.name))
    console.log(`Seeding ${file.name} to media collection...`)
    const mediaData = {
      alt: 'Seeded photo',
      url: `/api/media/${file.name}`,
      filename: file.name,
      mimeType: type,
      filesize: stats.size,
    }
    // bypass payload's media collection hooks by using the db directly (payload.db)
    await payload.db.create({
      collection: 'media',
      data: mediaData,
    })
  }

  //
}
