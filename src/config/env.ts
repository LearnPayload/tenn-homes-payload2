export const DATABASE_URL = process.env.DATABASE_URI!

if (!DATABASE_URL) {
  throw new Error('DATABASE_URI is not set')
}
