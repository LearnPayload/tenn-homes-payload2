"use client"
import { useSearchResults } from "@/app/(frontend)/(search)/search-results-provider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE } from "@/constants"
import { PopoverClose } from "@radix-ui/react-popover"
import { ChevronDownIcon, XIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const formatLabel = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    unitDisplay: "short",
    compactDisplay: "short",
    notation: "compact",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function FilterPrice() {
  const router = useRouter()
  const {
    updateSearch,
    searchCriteria: { filters },
  } = useSearchResults()
  const [minPrice, setMinPrice] = useState<number>(filters["min-price"] || DEFAULT_MIN_PRICE)
  const [maxPrice, setMaxPrice] = useState<number>(filters["max-price"] || DEFAULT_MAX_PRICE)
  const [value, setValue] = useState<string>(
    minPrice > 0 || maxPrice < DEFAULT_MAX_PRICE ? `${minPrice / 1000}-${maxPrice / 1000}` : "any",
  )

  const maxPriceLabel = maxPrice === DEFAULT_MAX_PRICE ? "Any" : `${formatLabel(maxPrice)}`
  const minPriceLabel = minPrice > 0 ? `${formatLabel(minPrice)}` : "Any"
  const label =
    minPrice > 0 || maxPrice < DEFAULT_MAX_PRICE ? (
      <span className="text-cyan-800 font-semibold">
        {minPriceLabel} - {maxPriceLabel}
      </span>
    ) : (
      "Price"
    )

  const resetFilters = () => {
    setMinPrice(DEFAULT_MIN_PRICE)
    setMaxPrice(DEFAULT_MAX_PRICE)
    router.push(
      updateSearch({
        filters: { ...filters, "min-price": undefined, "max-price": undefined },
      }),
    )
  }

  const setPriceRange = (value: string) => {
    setValue(value)
    if (value === "any") {
      setMinPrice(DEFAULT_MIN_PRICE)
      setMaxPrice(DEFAULT_MAX_PRICE)
    } else {
      const [min, max] = value.split("-").map(Number)
      setMinPrice(min * 1000)
      setMaxPrice(max * 1000)
    }
  }

  const isSet = minPrice > 0 || maxPrice < DEFAULT_MAX_PRICE

  return (
    <Popover>
      <div className="relative">
        {isSet && (
          <Button
            variant="ghost"
            size={"sm"}
            onClick={resetFilters}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-2 text-cyan-800"
          >
            <XIcon size={16} strokeWidth={3} />
          </Button>
        )}
        <PopoverTrigger asChild>
          <Button className="h-12 flex items-center gap-2" variant={"outline"}>
            <span>{label}</span>
            {!isSet ? (
              <span className="ml-2">
                <ChevronDownIcon size={16} />
              </span>
            ) : (
              <span className="w-6"></span>
            )}
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-fit grid gap-4">
        <div className="grid gap-2">
          <div>
            <h3 className="font-semibold mb-2">Price Range</h3>
            <RadioGroup
              className="flex flex-col gap-4 border rounded-md p-4"
              onValueChange={setPriceRange}
              value={value}
            >
              <div className="flex items-center gap-1">
                <RadioGroupItem value={"any"} id={`any`} />
                <Label htmlFor={`any`}>Any Price</Label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value={"100-300"} id={`100-300`} />
                <Label htmlFor={`100-300`}>$100K - $300K</Label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value={"300-500"} id={`300-500`} />
                <Label htmlFor={`300-500`}>$300K - $500K</Label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value={"500-750"} id={`500-750`} />
                <Label htmlFor={`500-750`}>$500K - $750K</Label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value={"750-1000"} id={`750-1000`} />
                <Label htmlFor={`750-1000`}>$750 - $1M</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <PopoverClose asChild>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => {
              const minPriceFilter = minPrice === DEFAULT_MIN_PRICE ? undefined : minPrice
              const maxPriceFilter = maxPrice === DEFAULT_MAX_PRICE ? undefined : maxPrice

              const url = updateSearch({
                filters: { ...filters, "min-price": minPriceFilter, "max-price": maxPriceFilter },
              })
              router.push(url)
            }}
          >
            Apply
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  )
}
