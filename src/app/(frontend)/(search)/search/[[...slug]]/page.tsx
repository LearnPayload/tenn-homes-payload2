import { SearchHeader } from "@/components/search/search-header"
import { SearchResults } from "@/components/search/search-results"
import { local } from "@/repository"
import { parseUrlToSearchCriteria } from "@/lib/search-utils"
import { SearchResultsProvider } from "../../search-results-provider"
import { Header } from "@/app/(frontend)/_layouts/header"
import { service } from "@/services"
import { LocationDecorator } from "@/repository/location/location-repository"
import { AdvancedSearchMap } from "@/components/search/map/advanced-search-map"
import { SearchParams } from "@/types"

interface SearchPageProps {
  params: Promise<{ slug: string[] }>
  searchParams: Promise<SearchParams>
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const { slug } = await params
  const queryParams = await searchParams

  const searchCriteria = parseUrlToSearchCriteria(slug, queryParams)

  const results = await service.listings.search(searchCriteria)
  const mapResults = await service.listings.search({
    ...searchCriteria,
    options: { ...searchCriteria.options, limit: 100, page: 1, pagination: false },
  })
  let locationInput
  if (searchCriteria.query === "city" && searchCriteria.filters.city) {
    locationInput = (await local.location.getBySlug(
      searchCriteria.filters.city as string,
    )) as LocationDecorator
  }
  if (searchCriteria.query === "zip" && searchCriteria.filters.zip) {
    locationInput = (await local.location.getFirst({
      zip: { equals: searchCriteria.filters.zip },
    })) as LocationDecorator
  }

  return (
    <SearchResultsProvider
      locationInput={locationInput?.original}
      initialData={results}
      mapResults={mapResults}
      searchCriteria={searchCriteria}
    >
      <div>
        <div className="sticky top-0 z-50">
          <div className="bg-white border-b">
            <Header />
          </div>
          <div className=" bg-white border-b">
            <div className="max-w-7xl  mx-auto px-4">
              <SearchHeader />
            </div>
          </div>
        </div>
        <div className="flex relative">
          <aside className="w-full lg:w-5/12 2xl:w-4/12 border-r">
            <SearchResults />
          </aside>
          <div className="w-7/12 2xl:w-8/12 right-0 fixed hidden lg:block h-[calc(100vh-146px)]">
            <AdvancedSearchMap mapStyle="light" />
          </div>
        </div>
      </div>
    </SearchResultsProvider>
  )
}
