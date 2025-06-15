"use client"
import { useSearchResults } from "@/app/(frontend)/(search)/search-results-provider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  PropertyType,
  propertyTypeMap,
  propertyTypeOptions,
} from "@/config/collections/Properties/property-type-options"
import { PopoverClose } from "@radix-ui/react-popover"
import { ChevronDownIcon, XIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function FilterType() {
  const router = useRouter()
  const {
    updateSearch,
    searchCriteria: { filters },
  } = useSearchResults()
  const [value, setValue] = useState<PropertyType | undefined>(filters["property-type"])

  const resetFilters = () => {
    setValue(undefined)
    router.push(
      updateSearch({
        filters: { ...filters, "property-type": undefined },
      }),
    )
  }
  const label = value ? (
    <span className="font-semibold text-cyan-800">{propertyTypeMap[value]}</span>
  ) : (
    "Property Type"
  )

  return (
    <Popover>
      <div className="relative">
        {value && (
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
            {!value ? (
              <span className="ml-2">
                <ChevronDownIcon size={16} />
              </span>
            ) : (
              <span className="w-6"></span>
            )}
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-80">
        <RadioGroup
          className="grid grid-cols-2 gap-4 mb-4"
          onValueChange={(value) => {
            setValue(value as PropertyType)
          }}
          value={value}
        >
          {propertyTypeOptions.map((option) => (
            <div key={option.value} className="flex items-center gap-3">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
        <PopoverClose asChild>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => {
              const url = updateSearch({ filters: { ...filters, "property-type": value } })
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
