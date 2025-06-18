"use client"

import { MapPin } from "lucide-react"
// import Image from "next/image"

export const SearchResultsMap = () => {
  return (
    <div className="h-full w-full">
      {/* <Image
        src="/sample-map.png"
        alt="Map"
        width={800}
        height={600}
        className="w-full h-full object-cover"
      /> */}
      <div className="flex items-center justify-center h-full bg-muted/30">
        <div className="text-center space-y-4">
          <MapPin className="h-16 w-16 text-muted-foreground mx-auto" />
          <div>
            <h3 className="text-lg font-semibold text-muted-foreground">Map View</h3>
            <p className="text-sm text-muted-foreground">
              Interactive map with property pins coming soon
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
