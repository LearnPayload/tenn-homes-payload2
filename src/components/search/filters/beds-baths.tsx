"use client"
import { useSearchResults } from "@/app/(frontend)/(search)/search-results-provider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  ListingStatus,
  listingStatusMap,
  listingStatusOptions,
} from "@/config/collections/Properties/listing-status-map"
import { PopoverClose } from "@radix-ui/react-popover"
import { ChevronDownIcon, XIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function FilterBedsBaths() {
  const router = useRouter()
  const {
    updateSearch,
    searchCriteria: { filters },
  } = useSearchResults()
  const [beds, setBeds] = useState<number>(filters["min-beds"] || 0)
  const [baths, setBaths] = useState<number>(filters["min-baths"] || 0)

  const label =
    beds || baths ? (
      <span className="font-semibold text-cyan-800">
        {beds}+ bd / {baths}+ ba
      </span>
    ) : (
      "Beds/Baths"
    )

  const resetFilters = () => {
    setBeds(0)
    setBaths(0)
    router.push(
      updateSearch({
        filters: { ...filters, "min-beds": undefined, "min-baths": undefined },
      }),
    )
  }

  return (
    <Popover>
      <div className="relative">
        {beds + baths > 0 && (
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
            {beds + baths === 0 ? (
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
            <h3 className="font-semibold">Beds</h3>
            <RadioGroup
              className="flex items-center gap-4 border rounded-md px-6 py-3"
              onValueChange={(value) => {
                setBeds(Number(value))
              }}
              value={String(beds)}
            >
              <div className="flex items-center gap-1">
                <RadioGroupItem value={"0"} id={`beds:0+`} />
                <Label htmlFor={`beds:0+`}>Any</Label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value={"1"} id={`beds:1+`} />
                <Label htmlFor={`beds:1+`}>1+</Label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value={"2"} id={`beds:2+`} />
                <Label htmlFor={`beds:2+`}>2+</Label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value={"3"} id={`beds:3+`} />
                <Label htmlFor={`beds:3+`}>3+</Label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value={"4"} id={`beds:4+`} />
                <Label htmlFor={`beds:4+`}>4+</Label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value={"5"} id={`beds:5+`} />
                <Label htmlFor={`beds:5+`}>5+</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <h3 className="font-semibold">Baths</h3>
            <RadioGroup
              className="flex items-center gap-4 border rounded-md px-6 py-3"
              onValueChange={(value) => {
                setBaths(Number(value))
              }}
              value={String(baths)}
            >
              <div className="flex items-center gap-1">
                <RadioGroupItem value={"0"} id={`baths:0+`} />
                <Label htmlFor={`baths:0+`}>Any</Label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value={"1"} id={`baths:1+`} />
                <Label htmlFor={`baths:1+`}>1+</Label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value={"2"} id={`baths:2+`} />
                <Label htmlFor={`baths:2+`}>2+</Label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value={"3"} id={`baths:3+`} />
                <Label htmlFor={`baths:3+`}>3+</Label>
              </div>
              <div className="flex items-center gap-1">
                <RadioGroupItem value={"4"} id={`baths:4+`} />
                <Label htmlFor={`baths:4+`}>4+</Label>
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
              const url = updateSearch({
                filters: { ...filters, "min-beds": beds, "min-baths": baths },
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
