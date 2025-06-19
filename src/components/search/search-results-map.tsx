"use client"

import { useState, useCallback } from "react"
import GoogleMapReact from "google-map-react"
import { useSearchResults } from "@/app/(frontend)/(search)/search-results-provider"
import { PropertyMarker } from "./map/property-marker"
import { PropertyPopup } from "./map/property-popup"
import { MockMap } from "./map/mock-map"
import { PropertyDecorator } from "@/repository/property/property-decorator"
import { useMapBounds, getPropertiesWithLocation } from "@/hooks/use-map-bounds"
import { getMapStyle } from "@/lib/map-styles"

export const SearchResultsMap = () => {
  const { searchResults } = useSearchResults()
  const [selectedProperty, setSelectedProperty] = useState<PropertyDecorator | null>(null)
  const [hoveredProperty, setHoveredProperty] = useState<PropertyDecorator | null>(null)

  // Check if Google Maps API key is available
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  if (!apiKey || apiKey === "your_google_maps_api_key_here") {
    return <MockMap />
  }

  // Get properties with valid location data and calculate map bounds
  const propertiesWithLocation = getPropertiesWithLocation(searchResults.docs)
  const mapConfig = useMapBounds(searchResults.docs)

  const handleMarkerClick = useCallback(
    (property: PropertyDecorator) => {
      setSelectedProperty(property === selectedProperty ? null : property)
    },
    [selectedProperty],
  )

  const handleMarkerHover = useCallback((property: PropertyDecorator | null) => {
    setHoveredProperty(property)
  }, [])

  const handleClosePopup = useCallback(() => {
    setSelectedProperty(null)
  }, [])

  return (
    <div className="h-full w-full relative">
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        center={mapConfig.center}
        zoom={mapConfig.zoom}
        options={{
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          styles: getMapStyle("real-estate"), // Change this to any style you want
        }}
      >
        {propertiesWithLocation.map((property) => {
          const [lat, lng] = property.original.point
          const isSelected = selectedProperty?.original.id === property.original.id
          const isHovered = hoveredProperty?.original.id === property.original.id

          return (
            <PropertyMarker
              // @ts-ignore - google-map-react expects lat/lng props
              lat={lat}
              lng={lng}
              key={property.original.id}
              property={property}
              isSelected={isSelected}
              isHovered={isHovered}
              onClick={() => handleMarkerClick(property)}
              onMouseEnter={() => handleMarkerHover(property)}
              onMouseLeave={() => handleMarkerHover(null)}
            />
          )
        })}

        {selectedProperty &&
          (() => {
            const [lat, lng] = selectedProperty.original.point
            return (
              <PropertyPopup
                // @ts-ignore - google-map-react expects lat/lng props
                lat={lat}
                lng={lng}
                property={selectedProperty}
                onClose={handleClosePopup}
                position={{ lat, lng }}
              />
            )
          })()}
      </GoogleMapReact>

      {/* Map controls overlay */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-3 text-sm">
        <div className="font-semibold">{searchResults.totalDocs} properties</div>
        <div className="text-muted-foreground">{propertiesWithLocation.length} shown on map</div>
      </div>
    </div>
  )
}
