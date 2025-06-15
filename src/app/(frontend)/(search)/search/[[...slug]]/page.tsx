import { SearchHeader } from "@/components/search/search-header"
import { SearchResults } from "@/components/search/search-results"
import { SearchResultsMap } from "@/components/search/search-results-map"
import { local } from "@/repository"
import { PaginatedDocs, Where } from "payload"
import { Property } from "@/payload-types"
import { parseUrlToSearchCriteria } from "@/lib/search-utils"
import { SearchResultsProvider } from "../../search-results-provider"
import { Header } from "@/app/(frontend)/_layouts/header"
import { service } from "@/services"

interface SearchPageProps {
  params: Promise<{ slug: string[] }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
  const { slug } = await params
  const queryParams = await searchParams

  const searchCriteria = parseUrlToSearchCriteria(slug, queryParams)
  const results = await service.listings.search(searchCriteria)

  return (
    <SearchResultsProvider initialData={results} searchCriteria={searchCriteria}>
      <div className="h-auto lg:h-screen grid grid-cols-12 grid-rows-[auto_1fr] w-full overflow-hidden">
        <div className="col-span-12 h-36 bg-white">
          <div className="border-b">
            <Header />
          </div>
          <SearchHeader />
        </div>
        <div className="flex col-span-12">
          <div className="w-full lg:w-1/3 lg:min-w-[570px] relative border-t">
            <div className="relative lg:absolute top-0 w-full bg-white overflow-y-auto h-full">
              <SearchResults />
            </div>
          </div>
          <div className="hidden lg:flex flex-1 w-full lg:w-2/3 bg-gray-300">
            <SearchResultsMap />
          </div>
        </div>
      </div>
    </SearchResultsProvider>
  )
}
