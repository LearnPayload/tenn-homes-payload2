// components/search/SearchResultsProvider.tsx
"use client"

import { buildSearchUrl, SearchCriteria } from "@/lib/search-utils"
import { Property } from "@/payload-types"
import { PropertyDecorator } from "@/repository/property/property-decorator"
import { SearchCriteriaInput } from "@/types"
import { PaginatedDocs } from "payload"
import { createContext, useContext, ReactNode } from "react"

interface SearchResultsContextType {
  searchCriteria: SearchCriteria
  searchResults: PaginatedDocs<Property>
  isLoading: boolean
}

const SearchResultsContext = createContext<SearchResultsContextType | undefined>(undefined)

interface SearchResultsProviderProps {
  children: ReactNode
  initialData: PaginatedDocs<Property>
  searchCriteria: SearchCriteria
}

export function SearchResultsProvider({
  children,
  initialData,
  searchCriteria,
}: SearchResultsProviderProps) {
  const value: SearchResultsContextType = {
    searchCriteria,
    searchResults: initialData,
    isLoading: false, // You might want to add loading state management
  }

  return <SearchResultsContext.Provider value={value}>{children}</SearchResultsContext.Provider>
}

// Custom hook to use the search results context
export function useSearchResults() {
  const context = useContext(SearchResultsContext)
  const updateSearch =
    (context: SearchResultsContextType) =>
    (updates: Partial<SearchCriteriaInput>, test = "default") => {
      const currentCriteria = context.searchCriteria
      const newCriteria = { ...currentCriteria, ...updates }
      const newUrl = buildSearchUrl(newCriteria)
      return newUrl
    }
  if (context === undefined) {
    throw new Error("useSearchResults must be used within a SearchResultsProvider")
  }

  // decorate search results
  const docs = (context.searchResults?.docs ?? []).map((doc) => new PropertyDecorator(doc))

  return {
    ...context,
    updateSearch: updateSearch(context),
    searchResults: { ...context.searchResults, docs } as PaginatedDocs<PropertyDecorator>,
  }
}
