import { FindOptions, SearchCriteriaInput } from "@/types"

export type SearchCriteria = {
  query: string
  filters: Record<string, any>
  options: FindOptions
}

export type SearchQueryTypes = "city" | "zip"
export type SearchFilterKeys =
  | "city"
  | "zip"
  | "property-type"
  | "min-price"
  | "max-price"
  | "min-beds"
  | "max-beds"
  | "min-baths"

export function parseUrlToSearchCriteria(
  pathSegments: string[] = [],
  urlQueryParams: Record<string, string | string[] | undefined>,
): SearchCriteria {
  const [query, queryValue] = pathSegments as [SearchQueryTypes, string]

  // Parse query parameters
  const filters: Record<SearchFilterKeys, string | string[] | number | number[] | undefined> = {
    city: "",
    zip: "",
    "property-type": "",
    "min-price": "",
    "max-price": "",
    "min-beds": "",
    "max-beds": "",
    "min-baths": "",
  }

  if (query) {
    filters[query] = queryValue ? decodeURIComponent(queryValue) : undefined
  }

  if (urlQueryParams["property-type"]) {
    filters["property-type"] = urlQueryParams["property-type"] ?? "forsale"
  }
  // Handle price range
  if (urlQueryParams["min-price"]) {
    filters["min-price"] = parseInt(urlQueryParams["min-price"] as string) * 1000 || undefined
  }
  if (urlQueryParams["max-price"]) {
    filters["max-price"] = parseInt(urlQueryParams["max-price"] as string) * 1000 || undefined
  }
  // Handle bedrooms
  if (urlQueryParams["min-beds"]) {
    filters["min-beds"] = parseInt(urlQueryParams["min-beds"] as string) || undefined
  }
  if (urlQueryParams["max-beds"]) {
    filters["max-beds"] = parseInt(urlQueryParams["max-beds"] as string) || undefined
  }
  // Handle bathrooms
  if (urlQueryParams["min-baths"]) {
    filters["min-baths"] = parseFloat(urlQueryParams["min-baths"] as string) || undefined
  }
  // Clean up undefined values
  Object.keys(filters).forEach((key) => {
    if (filters[key as SearchFilterKeys] === undefined) {
      delete filters[key as SearchFilterKeys]
    }
  })

  return {
    query,
    filters,
    options: {
      sort: (urlQueryParams.sort as string) || "relevance",
      page: parseInt((urlQueryParams.page as string) || "1"),
      limit: parseInt((urlQueryParams.limit as string) || "12"),
    },
  }
}

export function buildSearchUrl(searchCriteria: Partial<SearchCriteriaInput>): string {
  const { query = "", filters = {}, sort, page, limit } = searchCriteria

  // Build path segments
  const pathSegments = ["/search"]

  if (query) {
    pathSegments.push(encodeURIComponent(query.toLowerCase().replace(/\s+/g, "-")))
  }

  if (filters.city) {
    pathSegments.push(filters.city)
  }

  if (filters.zip) {
    pathSegments.push(filters.zip)
  }

  const path = pathSegments.join("/")

  // Build query parameters
  const params = new URLSearchParams()

  // Add filters as query params (except property-type which is in path)
  Object.entries(filters).forEach(([key, value]) => {
    if (typeof value !== "undefined" && value !== "" && !["city", "zip"].includes(key)) {
      params.set(key, value.toString())
    }
  })

  // Add other parameters
  if (sort && sort !== "relevance") {
    params.set("sort", sort)
  }

  if (page && page > 1) {
    params.set("page", page.toString())
  }

  if (limit && limit !== 12) {
    params.set("limit", limit.toString())
  }

  const queryString = params.toString()
  return queryString ? `${path}?${queryString}` : path
}
