"use client"

import { Search, SlidersIcon } from "lucide-react"
import { FilterType } from "./filters/type"
import { FilterBedsBaths } from "./filters/beds-baths"
import { FilterPrice } from "./filters/price"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { useSearchResults } from "@/app/(frontend)/(search)/search-results-provider"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { Autosuggest } from "../autosuggest"
import { FilterPopover } from "./filters/filter-popover"
import { listingStatusMap } from "@/config/collections/Properties/listing-status-map"
import { FilterStatus } from "./filters/status"
import {
  PropertyType,
  propertyTypeMap,
} from "@/config/collections/Properties/property-type-options"
import { DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE } from "@/constants"
import { formatPriceShort } from "@/lib/format-price"

export const SearchHeader = () => {
  const router = useRouter()

  const { locationInputValue, setFilters } = useSearchResults()

  return (
    <div className="h-20 flex items-center justify-center">
      <div className="grid grid-cols-12 gap-4 w-full">
        <div className="relative w-full col-span-10 md:col-span-10 lg:col-span-5">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Autosuggest
            type="text"
            placeholder="City, Address, ZIP"
            defaultValue={locationInputValue}
            className="pl-10 h-12 border-gray-300 md:text-base w-full"
            onChange={(value) => {
              if (!value) {
                setFilters({
                  city: undefined,
                  zip: undefined,
                })
              }
            }}
            onSelect={(suggestion) => {
              if (suggestion.type === "address") {
                router.push(suggestion.url)
              }
              const key =
                suggestion.type === "city" ? "city" : suggestion.type === "zip" ? "zip" : null
              if (!key) return
              const otherKey = key === "city" ? "zip" : "city"
              setFilters({
                [key]: suggestion.value,
                [otherKey]: undefined,
              })
            }}
          />
        </div>

        <div className="col-span-2 lg:col-span-7 flex items-center justify-center">
          <Filters />
        </div>
      </div>
    </div>
  )
}

const Filters = () => {
  const {
    searchResults,
    setFilters,
    filters: { propertyStatus, propertyType, beds, baths, minPrice, maxPrice },
  } = useSearchResults()

  const maxPriceLabel = maxPrice === DEFAULT_MAX_PRICE ? "Any" : `${formatPriceShort(maxPrice)}`
  const minPriceLabel = minPrice > 0 ? `${formatPriceShort(minPrice)}` : "Any"

  return (
    <div className="flex flex-row gap-4 items-center justify-center">
      <div className="hidden lg:flex items-center justify-center gap-2 w-full text-sm text-muted-foreground">
        <FilterPopover
          label={propertyStatus ? listingStatusMap[propertyStatus]?.label : undefined}
          placeholder="Status"
          isSet={!!propertyStatus}
          onClear={() => setFilters({ "property-status": undefined })}
        >
          <FilterStatus />
        </FilterPopover>
        <FilterPopover
          label={
            propertyType
              ? propertyType.map((t: PropertyType) => propertyTypeMap[t]?.label).join(", ")
              : undefined
          }
          placeholder="Property Type"
          isSet={!!propertyType}
          onClear={() => setFilters({ "property-type": undefined })}
        >
          <FilterType />
        </FilterPopover>
        <FilterPopover
          label={`${beds || "0"}+ bd / ${baths || "0"}+ ba`}
          placeholder="Beds / Baths"
          isSet={!!(beds || baths)}
          onClear={() => setFilters({ "min-beds": undefined, "min-baths": undefined })}
        >
          <FilterBedsBaths />
        </FilterPopover>

        <div className="hidden xl:block">
          <FilterPopover
            label={`${minPriceLabel} - ${maxPriceLabel}`}
            placeholder="Price"
            isSet={minPrice > DEFAULT_MIN_PRICE || maxPrice < DEFAULT_MAX_PRICE}
            onClear={() => setFilters({ "min-price": undefined, "max-price": undefined })}
          >
            <FilterPrice />
          </FilterPopover>
        </div>
      </div>
      <div className="xl:hidden flex">
        <Sheet>
          <SheetTrigger>
            <SlidersIcon />
          </SheetTrigger>
          <SheetContent className="w-full max-w-full gap-0">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Adjust your search criteria</SheetDescription>
            </SheetHeader>
            <div className="flex flex-col justify-between overflow-y-scroll gap-4">
              <div className="grid divide-y">
                <FilterStatus />
                <FilterType />
                <FilterBedsBaths />
                <FilterPrice />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="button" size="lg" className="w-full">
                  See {searchResults.totalDocs} homes
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
