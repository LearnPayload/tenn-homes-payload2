"use client"

import { useSearchResults } from "@/app/(frontend)/(search)/search-results-provider"
import { getPropertiesWithLocation } from "@/hooks/use-map-bounds"
import { MapPin, Navigation } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export const MockMap = () => {
  const { searchResults } = useSearchResults()
  const propertiesWithLocation = getPropertiesWithLocation(searchResults.docs)

  return (
    <div className="h-full w-full relative bg-gradient-to-br from-blue-50 to-green-50">
      {/* Mock map background with grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="border border-gray-300" />
          ))}
        </div>
      </div>

      {/* Mock property markers */}
      <div className="absolute inset-0 p-8">
        {propertiesWithLocation.slice(0, 8).map((property, index) => {
          // Distribute properties across the mock map
          const positions = [
            { top: "20%", left: "25%" },
            { top: "35%", left: "45%" },
            { top: "15%", left: "65%" },
            { top: "50%", left: "30%" },
            { top: "60%", left: "55%" },
            { top: "75%", left: "20%" },
            { top: "65%", left: "70%" },
            { top: "40%", left: "75%" },
          ]

          const position = positions[index] || { top: "50%", left: "50%" }
          const price = property.original.price
            ? `$${(property.original.price / 1000).toFixed(0)}K`
            : "Call"

          return (
            <Link
              href={property.url}
              key={property.original.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
              style={{ top: position.top, left: position.left }}
            >
              <div className="bg-white rounded-lg shadow-lg border px-3 py-2 font-semibold text-sm whitespace-nowrap hover:bg-primary hover:text-primary-foreground">
                {price}
              </div>
              <div className="absolute left-1/2 top-full -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent border-t-white" />
            </Link>
          )
        })}
      </div>

      {/* Center indicator */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Navigation className="h-6 w-6 text-primary opacity-50" />
      </div>

      {/* Mock map notice */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-3 text-sm max-w-xs">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="font-semibold">Demo Map</span>
        </div>
        <p className="text-muted-foreground text-xs">
          Add Google Maps API key to see interactive map
        </p>
      </div>

      {/* Stats overlay */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-3 text-sm">
        <div className="font-semibold">{searchResults.totalDocs} properties</div>
        <div className="text-muted-foreground">
          {propertiesWithLocation.length} with coordinates
        </div>
        <Badge variant="outline" className="mt-1">
          Mock View
        </Badge>
      </div>

      {/* Mock controls */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md p-2 flex gap-1">
        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-xs">
          +
        </div>
        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-xs">
          -
        </div>
      </div>
    </div>
  )
}
