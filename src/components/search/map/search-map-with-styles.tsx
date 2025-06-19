"use client"

import { useState } from "react"
import { AdvancedSearchMap } from "./advanced-search-map"
import { MapStyleSwitcher } from "./map-style-switcher"
import { MapStyle } from "@/lib/map-styles"

interface SearchMapWithStylesProps {
  enableClustering?: boolean
  enableMapControls?: boolean
  onMapBoundsChange?: (bounds: any) => void
}

export const SearchMapWithStyles = ({
  enableClustering = true,
  enableMapControls = true,
  onMapBoundsChange,
}: SearchMapWithStylesProps) => {
  const [mapStyle, setMapStyle] = useState<MapStyle>("real-estate")

  return (
    <div className="h-full w-full relative">
      <AdvancedSearchMap
        enableClustering={enableClustering}
        enableMapControls={enableMapControls}
        mapStyle={mapStyle}
        onMapBoundsChange={onMapBoundsChange}
      />
      
      {/* Style switcher overlay */}
      <div className="absolute bottom-4 left-4">
        <MapStyleSwitcher
          currentStyle={mapStyle}
          onStyleChange={setMapStyle}
        />
      </div>
    </div>
  )
}