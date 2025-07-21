"use client"
import { useSearchResults } from "@/app/(frontend)/(search)/search-results-provider"
import { RadioGroup } from "@/components/ui/radio-group"
import { DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE } from "@/constants"
import { FilterGroupItem } from "./filter-group-item"

const priceOptions = [
  {
    value: "100|300",
    label: "$100K - $300K",
  },
  {
    value: "300|500",
    label: "$300K - $500K",
  },
  {
    value: "500|750",
    label: "$500K - $750K",
  },
  {
    value: "750|10000",
    label: "$750K - $10M",
  },
]

export function FilterPrice() {
  const {
    setFilters,
    filters: { minPrice, maxPrice },
  } = useSearchResults()

  const value =
    minPrice > DEFAULT_MIN_PRICE || maxPrice < DEFAULT_MAX_PRICE
      ? `${minPrice / 1000}|${maxPrice / 1000}`
      : null

  const setPriceRange = (value: string) => {
    let newMinPrice = undefined
    let newMaxPrice = undefined
    if (value !== null) {
      const [min, max] = value.split("|").map(Number)
      newMinPrice = min * 1000
      newMaxPrice = max * 1000
    }

    setFilters({ "min-price": newMinPrice, "max-price": newMaxPrice })
  }

  return (
    <div className="grid gap-2 p-4">
      <div className="flex items-center gap-3">
        <h3 className="font-semibold">Price</h3>
        {value && (
          <button
            className="text-cyan-700 underline p-0 text-sm font-semibold"
            type="button"
            onClick={() => setFilters({ "min-price": undefined, "max-price": undefined })}
          >
            Clear
          </button>
        )}
      </div>
      <RadioGroup className="flex flex-col gap-2" onValueChange={setPriceRange} value={value}>
        {priceOptions.map((option) => (
          <FilterGroupItem
            id={`price:${option.value}`}
            key={`price:${option.value}`}
            value={String(option.value)}
            checked={value === option.value}
            onChange={() => setPriceRange(option.value)}
          >
            {option.label}
          </FilterGroupItem>
        ))}
      </RadioGroup>
    </div>
  )
}
