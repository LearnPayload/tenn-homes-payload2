import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import { PaginatedDocs } from "payload"
import { PropertyDecorator } from "@/repository/property/property-decorator"
import { SearchCriteriaInput } from "@/types"

export const SearchResultsPagination = ({
  searchResults,
  currentPage,
  updateSearch,
}: {
  searchResults: PaginatedDocs<PropertyDecorator>
  currentPage: number
  updateSearch: (params: Partial<SearchCriteriaInput>, test?: string) => string
}) => {
  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={updateSearch({ page: searchResults.prevPage ?? 1 }, "previous")}
              className={!searchResults.hasPrevPage ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {Array.from({ length: searchResults.totalPages }, (_, i) => i + 1).map((pageNumber) => {
            const isCurrentPage = pageNumber === searchResults.page
            const showPage =
              pageNumber === 1 ||
              pageNumber === searchResults.totalPages ||
              Math.abs(pageNumber - currentPage) <= 1

            if (!showPage) {
              if (pageNumber === currentPage - 3 || pageNumber === currentPage + 3) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationEllipsis />
                  </PaginationItem>
                )
              }
              return null
            }

            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href={updateSearch({ page: pageNumber }, `page(${pageNumber})`)}
                  isActive={isCurrentPage}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            )
          })}

          <PaginationItem>
            <PaginationNext
              href={updateSearch({ page: searchResults.nextPage ?? 1 }, "next")}
              className={!searchResults.hasNextPage ? "pointer-events-none opacity-50 " : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
