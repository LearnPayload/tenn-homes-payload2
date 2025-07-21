"use client"
import { PropertySearchCard } from "./property-search-card"

import { useSearchResults } from "@/app/(frontend)/(search)/search-results-provider"
import { SearchResultsFooter } from "./search-results-footer"
import { PropertyProvider } from "../providers/property"
import { SearchResultsPagination } from "./search-results-pagination"

export const SearchResults = () => {
  const { searchResults, updateSearch } = useSearchResults()

  const currentPage = searchResults.page || 1
  return (
    <div className="flex-1">
      <div className="flex-1 w-full flex flex-col justify-between h-[calc(100vh-144px)]">
        <div className="h-16 p-4 border-b flex items-center justify-between bg-white">
          <p className="text-sm text-muted-foreground">
            {/* Show the offset based on limit and page number */}
            {(currentPage - 1) * searchResults.limit + 1} to{" "}
            {Math.min(currentPage * searchResults.limit, searchResults.totalDocs)} of{" "}
            {searchResults.totalDocs} homes
          </p>
        </div>
        <div className="bg-white relative flex-1 h-[calc(100vh-244px)] overflow-y-auto">
          {searchResults.totalDocs === 0 ? (
            <div className="p-4">No properties found.</div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 p-4">
              {searchResults.docs.map((property) => (
                <PropertyProvider property={property.original} key={property.id}>
                  <PropertySearchCard />
                </PropertyProvider>
              ))}
            </div>
          )}
        </div>
        <div className="h-20 flex items-center justify-center">
          <SearchResultsPagination
            currentPage={currentPage}
            searchResults={searchResults}
            updateSearch={updateSearch}
          />
        </div>
      </div>

      <div className="">
        <SearchResultsFooter />
      </div>
    </div>
  )
}
