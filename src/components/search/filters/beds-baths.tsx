"use client"
import { useSearchResults } from "@/app/(frontend)/(search)/search-results-provider"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FilterGroupItem } from "./filter-group-item"

const bedsOptions = [
  {
    value: 1,
    label: "1+",
  },
  {
    value: 2,
    label: "2+",
  },
  {
    value: 3,
    label: "3+",
  },
  {
    value: 4,
    label: "4+",
  },
  {
    value: 5,
    label: "5+",
  },
]

const bathsOptions = [
  {
    value: 1,
    label: "1+",
  },
  {
    value: 1.5,
    label: "1.5+",
  },
  {
    value: 2,
    label: "2+",
  },
  {
    value: 2.5,
    label: "2.5+",
  },
  {
    value: 3,
    label: "3+",
  },
  {
    value: 4,
    label: "4+",
  },
]

export function FilterBedsBaths() {
  const {
    setFilters,
    filters: { beds, baths },
  } = useSearchResults()

  return (
    <div className="grid gap-4 p-4">
      <div className="grid gap-2">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold">Beds</h3>
          {!!beds && (
            <button
              className="text-cyan-700 underline p-0 text-sm font-semibold"
              type="button"
              onClick={() => setFilters({ "min-beds": undefined })}
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex items-center gap-1">
          {bedsOptions.map((option) => (
            <FilterGroupItem
              id={`beds:${option.value}`}
              key={`beds:${option.value}`}
              value={String(option.value)}
              checked={String(beds) === String(option.value)}
              onChange={() => {
                setFilters({ "min-beds": option.value, "min-baths": baths })
              }}
            >
              {option.label}
            </FilterGroupItem>
          ))}
        </div>
      </div>
      <div className="grid gap-2">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold">Baths</h3>
          {!!baths && (
            <button
              className="text-cyan-700 underline p-0 text-sm font-semibold"
              type="button"
              onClick={() => setFilters({ "min-baths": undefined })}
            >
              Clear
            </button>
          )}
        </div>
        <RadioGroup
          className="flex items-center gap-1"
          onValueChange={(value) => {
            setFilters({ "min-beds": beds, "min-baths": value })
          }}
          value={String(baths)}
        >
          {bathsOptions.map((option) => (
            <FilterGroupItem
              id={`baths:${option.value}`}
              key={`baths:${option.value}`}
              value={String(option.value)}
              checked={String(baths) === String(option.value)}
              onChange={() => {
                setFilters({ "min-beds": beds, "min-baths": option.value })
              }}
            >
              {option.label}
            </FilterGroupItem>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}
