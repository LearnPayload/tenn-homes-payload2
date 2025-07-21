import { Location } from "@/payload-types"
import { local } from "@/repository"
import csv from "csv-parser"
import fs from "fs"
import path, { dirname } from "path"
import slugify from "slugify"
import { fileURLToPath } from "url"

type RawData = Omit<Location, "id" | "updatedAt" | "createdAt"> & {
  code: string
}

export async function seedLocations(): Promise<void> {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const csvFilePath = path.resolve(__dirname, "./zip_codes.csv")

  const locations: Omit<Location, "id" | "updatedAt" | "createdAt">[] = []

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (data: RawData) => {
        // Filter by target counties
        locations.push({
          zip: String(data.code),
          city: data.city,
          slug: slugify(data.city, {
            lower: true,
            strict: true,
          }),
          state_abbr: data.state_abbr,
          state_name: "Tennessee",
          county: data.county,
          latitude: Number(data.latitude),
          longitude: Number(data.longitude),
          est_population: Number(data.est_population),
        })
      })
      .on("end", () => {
        console.log(`Found ${locations.length} zip codes`)
        resolve()
      })
      .on("error", (error: Error) => {
        console.error("Error reading CSV file:", error)
        reject(error)
      })
  })

  for (const location of locations) {
    await local.location.create(location)
  }
}
