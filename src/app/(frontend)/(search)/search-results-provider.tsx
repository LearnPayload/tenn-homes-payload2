// components/search/SearchResultsProvider.tsx
"use client"

import { ListingStatus } from "@/config/collections/Properties/listing-status-map"
import { PropertyType } from "@/config/collections/Properties/property-type-options"
import { DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE } from "@/constants"
import { buildSearchUrl, SearchCriteria, SearchFilterKeys } from "@/lib/search-utils"
import { Location, Property } from "@/payload-types"
import { PropertyDecorator } from "@/repository/property/property-decorator"
import { SearchCriteriaInput } from "@/types"
import { useRouter } from "next/navigation"
import { PaginatedDocs } from "payload"
import { createContext, useContext, ReactNode, useState } from "react"

interface SearchResultsContextType {
  searchCriteria: SearchCriteria
  searchResults: PaginatedDocs<Property>
  mapResults: PaginatedDocs<Property>
  locationInput?: Location
  isLoading: boolean
}

const SearchResultsContext = createContext<SearchResultsContextType | undefined>(undefined)

interface SearchResultsProviderProps {
  children: ReactNode
  initialData: PaginatedDocs<Property>
  mapResults: PaginatedDocs<Property>
  searchCriteria: SearchCriteria
  locationInput?: Location
}

export function SearchResultsProvider({
  children,
  initialData,
  mapResults,
  searchCriteria,
  locationInput,
}: SearchResultsProviderProps) {
  const value: SearchResultsContextType = {
    locationInput,
    searchCriteria,
    searchResults: initialData,
    mapResults,
    isLoading: false, // You might want to add loading state management
  }

  return <SearchResultsContext.Provider value={value}>{children}</SearchResultsContext.Provider>
}

// Custom hook to use the search results context
export function useSearchResults() {
  const context = useContext(SearchResultsContext)
  const router = useRouter()

  if (context === undefined) {
    throw new Error("useSearchResults must be used within a SearchResultsProvider")
  }

  const updateSearch =
    (context: SearchResultsContextType) => (updates: Partial<SearchCriteriaInput>) => {
      const currentCriteria = context.searchCriteria
      const newCriteria = { ...currentCriteria, ...updates }
      const newUrl = buildSearchUrl(newCriteria)
      return newUrl
    }

  const setFilters = (filters: Partial<Record<SearchFilterKeys, any>>) => {
    router.push(
      updateSearch(context)({ filters: { ...context.searchCriteria.filters, ...filters } }),
    )
  }

  // decorate search results
  const docs = (context.searchResults?.docs ?? []).map((doc) => new PropertyDecorator(doc))
  const mapDocs = (context.mapResults?.docs ?? []).map((doc) => new PropertyDecorator(doc))

  const filters = context.searchCriteria.filters || {}

  const minPrice =
    filters["min-price"] && Number(filters["min-price"]) > DEFAULT_MIN_PRICE
      ? Number(filters["min-price"])
      : DEFAULT_MIN_PRICE
  const maxPrice =
    filters["max-price"] && Number(filters["max-price"]) < DEFAULT_MAX_PRICE
      ? Number(filters["max-price"])
      : DEFAULT_MAX_PRICE

  const beds = filters["min-beds"]
  const baths = filters["min-baths"]

  const propertyStatus = filters["property-status"] as ListingStatus | undefined
  const propertyType = filters["property-type"] as PropertyType[] | undefined

  const locationInputValue =
    context.searchCriteria.query === "city" && context.locationInput?.city
      ? context.locationInput.city
      : context.searchCriteria.query === "zip" && context.locationInput?.zip
        ? context.locationInput.zip
        : ""

  return {
    ...context,
    setFilters,
    updateSearch: updateSearch(context),
    mapResults: { ...context.mapResults, docs: mapDocs } as PaginatedDocs<PropertyDecorator>,
    searchResults: { ...context.searchResults, docs } as PaginatedDocs<PropertyDecorator>,
    locationInputValue,
    filters: {
      beds,
      baths,
      minPrice,
      maxPrice,
      propertyStatus,
      propertyType,
    },
  }
}
