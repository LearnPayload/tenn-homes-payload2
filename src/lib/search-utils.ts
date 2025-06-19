import { FindOptions, SearchCriteriaInput, SearchParams } from "@/types"

export type SearchFilters = Record<SearchFilterKeys, string | number | string[] | number[] | null>

export type SearchCriteria = {
  query: string
  filters: SearchFilters
  options: FindOptions
}

export type SearchQueryTypes = "city" | "zip"
export type SearchFilterKeys =
  | "city"
  | "zip"
  | "property-type"
  | "property-status"
  | "min-price"
  | "max-price"
  | "min-beds"
  | "min-baths"

function getSingleParameterValue(
  param: string | string[] | undefined,
  defaultValue: string | number | null,
): string | number | null {
  if (Array.isArray(param)) {
    return param.length > 0 ? param[0] : defaultValue
  }
  return typeof param === "string" ? param : defaultValue
}

function getParameterValues(
  param: string | string[] | undefined,
  defaultValue: string[] | null,
): string[] | null {
  if (Array.isArray(param)) {
    return param.length > 0 ? param : defaultValue
  }
  return typeof param === "string" ? [param] : defaultValue
}

export function parseUrlToSearchCriteria(
  pathSegments: string[] = [],
  urlQueryParams: SearchParams,
): SearchCriteria {
  const [query, queryValue] = pathSegments as [SearchQueryTypes, string]

  // Parse query parameters
  const filters: SearchFilters = {
    city: "",
    zip: "",
    "property-type": [],
    "property-status": "",
    "min-price": 0,
    "max-price": 0,
    "min-beds": 0,
    "min-baths": 0,
  }

  if (query && queryValue) {
    filters[query] = getSingleParameterValue(queryValue, "")
  }

  filters["property-type"] = getParameterValues(urlQueryParams["property-type"], null)
  filters["property-status"] = getSingleParameterValue(urlQueryParams["property-status"], "")
  filters["min-price"] = getSingleParameterValue(urlQueryParams["min-price"], null)
  filters["max-price"] = getSingleParameterValue(urlQueryParams["max-price"], null)
  filters["min-beds"] = getSingleParameterValue(urlQueryParams["min-beds"], null)
  filters["min-baths"] = getSingleParameterValue(urlQueryParams["min-baths"], null)

  // Clean up undefined values
  Object.keys(filters).forEach((key) => {
    if (filters[key as SearchFilterKeys] === null) {
      delete filters[key as SearchFilterKeys]
    }
  })

  console.log({ filters })

  return {
    query,
    filters,
    options: {
      sort: getSingleParameterValue(urlQueryParams["sort"], "relevance") as string,
      page: getSingleParameterValue(urlQueryParams["page"], 1) as number,
      limit: getSingleParameterValue(urlQueryParams["limit"], 12) as number,
      pagination: true,
      depth: 2,
    },
  }
}

export function buildSearchUrl(searchCriteria: Partial<SearchCriteriaInput>): string {
  const { query = "", filters = {}, sort, page, limit } = searchCriteria

  // Build path segments
  const pathSegments = ["/search"]

  if (filters.city) {
    pathSegments.push(`city/${encodeURIComponent(filters.city.toLowerCase())}`)
  }

  if (filters.zip) {
    pathSegments.push(`zip/${encodeURIComponent(filters.zip)}`)
  }

  const path = pathSegments.join("/")

  // Build query parameters
  const params = new URLSearchParams()

  // Add filters as query params (except property-type which is in path)
  Object.entries(filters).forEach(([key, value]) => {
    if (typeof value !== "undefined" && value !== "" && !["city", "zip"].includes(key)) {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v.toString()))
      } else if (typeof value === "number" || typeof value === "string") {
        params.set(key, value.toString())
      }
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
