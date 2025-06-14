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
  sort?: string
  depth?: number
}
