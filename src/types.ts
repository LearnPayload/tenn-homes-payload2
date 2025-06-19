export type SearchParams = { [key: string]: string | string[] | undefined }

export interface SearchCriteriaInput {
  query: string
  filters: Record<string, any>
  sort: string
  page: number
  limit: number
}

export type FindOptions = {
  limit: number
  page: number
  sort: string
  depth: number
  pagination: boolean
}

export interface LocationSuggestion {
  id: string
  type: "address" | "city" | "zip"
  value: string
  display: string
  url: string
}
