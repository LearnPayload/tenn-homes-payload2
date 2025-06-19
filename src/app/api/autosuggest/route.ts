import { local } from "@/repository"
import { LocationSuggestion } from "@/types"

const fetchSuggestions = async (query: string) => {
  const properties = await local.property.getAll({
    or: [
      { "location.city": { contains: query } },
      { "location.zip": { equals: query } },
      { street: { contains: query } },
    ],
  })

  const locations = await local.location.getAll({
    or: [{ city: { like: query } }, { zip: { like: query } }],
  })

  const suggestions: LocationSuggestion[] = []
  properties.docs.forEach((property) => {
    suggestions.push({
      id: property.id,
      type: "address",
      value: property.address.street,
      display: `${property.address.full_address}`,
      url: property.url,
    })
  })
  const cities = new Set<string>()
  locations.docs.forEach((location) => {
    if (cities.has(location.original.slug)) return
    cities.add(location.original.slug)
    suggestions.push({
      id: `${location.original.id}-city`,
      type: "city",
      value: location.original.slug,
      display: `${location.original.city}, ${location.original.state_abbr}`,
      url: `/search/city/${location.original.slug}`,
    })
    suggestions.push({
      id: `${location.original.id}-zip`,
      type: "zip",
      value: location.original.zip,
      display: `${location.original.zip} - ${location.original.city}, ${location.original.state_abbr}`,
      url: `/search/zip/${location.original.zip}`,
    })
  })

  return suggestions.sort((a, b) => {
    if (a.type === "address" && b.type !== "address") return -1
    if (b.type === "address" && a.type !== "address") return 1
    return a.display.localeCompare(b.display)
  })
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const query = url.searchParams.get("query") || ""

  if (query.length < 2) {
    return new Response(JSON.stringify([]), {
      headers: { "Content-Type": "application/json" },
    })
  }

  const suggestions = await fetchSuggestions(query)

  return new Response(JSON.stringify(suggestions), {
    headers: { "Content-Type": "application/json" },
  })
}
