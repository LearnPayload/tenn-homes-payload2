import { useSearchResults } from "@/app/(frontend)/(search)/search-results-provider"
import { RadioGroup } from "@/components/ui/radio-group"
import { listingStatusOptions } from "@/config/collections/Properties/listing-status-map"
import { FilterGroupItem } from "./filter-group-item"

export function FilterStatus() {
  const {
    setFilters,
    filters: { propertyStatus },
  } = useSearchResults()
  return (
    <div className="grid gap-2 p-4">
      <div className="flex items-center gap-3">
        <h3 className="font-semibold">Status</h3>
        {propertyStatus && (
          <button
            className="text-cyan-700 underline p-0 text-sm font-semibold"
            type="button"
            onClick={() => setFilters({ "property-status": undefined })}
          >
            Clear
          </button>
        )}
      </div>
      <RadioGroup
        className="grid grid-cols-2 gap-2"
        value={propertyStatus}
        onValueChange={(value) => {
          setFilters({
            "property-status": value,
          })
        }}
      >
        {listingStatusOptions.map((option) => (
          <FilterGroupItem
            id={`status:${option.value}`}
            key={`status:${option.value}`}
            value={String(option.value)}
            checked={propertyStatus === option.value}
            onChange={() => {
              setFilters({
                "property-status": option.value,
              })
            }}
          >
            {option.label}
          </FilterGroupItem>
        ))}
      </RadioGroup>
    </div>
  )
}
