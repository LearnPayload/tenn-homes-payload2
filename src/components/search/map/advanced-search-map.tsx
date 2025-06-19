"use client"

import { useState, useCallback, useRef } from "react"
import GoogleMapReact from "google-map-react"
import { useSearchResults } from "@/app/(frontend)/(search)/search-results-provider"
import { PropertyMarker } from "./property-marker"
import { PropertyCluster } from "./property-cluster"
import { PropertyPopup } from "./property-popup"
import { PropertyDecorator } from "@/repository/property/property-decorator"
import { useMapBounds, getPropertiesWithLocation } from "@/hooks/use-map-bounds"
import { useMapClustering } from "@/hooks/use-map-clustering"
import { getMapStyle, type MapStyle } from "@/lib/map-styles"
import { MapPin, ZoomIn, ZoomOut, Maximize2, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdvancedSearchMapProps {
  enableClustering?: boolean
  enableMapControls?: boolean
  mapStyle?: MapStyle
  onMapBoundsChange?: (bounds: any) => void
}

export const AdvancedSearchMap = ({
  enableClustering = true,
  enableMapControls = true,
  mapStyle = "real-estate",
  onMapBoundsChange,
}: AdvancedSearchMapProps) => {
  const { mapResults, searchResults } = useSearchResults()
  const [selectedProperty, setSelectedProperty] = useState<PropertyDecorator | null>(null)
  const [hoveredProperty, setHoveredProperty] = useState<PropertyDecorator | null>(null)
  const [selectedCluster, setSelectedCluster] = useState<PropertyDecorator[] | null>(null)
  const [mapInstance, setMapInstance] = useState<any>(null)
  const [currentZoom, setCurrentZoom] = useState(11)
  const mapRef = useRef<any>(null)

  // Check if Google Maps API key is available
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    return (
      <div className="flex items-center justify-center h-full bg-muted/30">
        <div className="text-center space-y-4">
          <MapPin className="h-16 w-16 text-muted-foreground mx-auto" />
          <div>
            <h3 className="text-lg font-semibold text-muted-foreground">Map View</h3>
            <p className="text-sm text-muted-foreground">
              Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Get properties with valid location data and calculate map bounds
  const propertiesWithLocation = getPropertiesWithLocation(mapResults.docs)
  const mapConfig = useMapBounds(mapResults.docs)

  // Use clustering if enabled
  const clusters = useMapClustering({
    properties: propertiesWithLocation,
    zoom: currentZoom,
  })

  const handleMarkerClick = useCallback(
    (property: PropertyDecorator) => {
      setSelectedProperty(property === selectedProperty ? null : property)
      setSelectedCluster(null)
    },
    [selectedProperty],
  )

  const handleClusterClick = useCallback(
    (properties: PropertyDecorator[]) => {
      if (properties.length === 1) {
        handleMarkerClick(properties[0])
      } else {
        setSelectedCluster(properties)
        setSelectedProperty(null)

        // Zoom to cluster bounds if map instance is available
        if (
          mapInstance &&
          properties.length > 1 &&
          typeof window !== "undefined" &&
          (window as any).google?.maps
        ) {
          const google = (window as any).google
          const bounds = new google.maps.LatLngBounds()
          properties.forEach((property) => {
            const [lat, lng] = property.original.point
            bounds.extend(new google.maps.LatLng(lat, lng))
          })
          mapInstance.fitBounds(bounds)
        }
      }
    },
    [mapInstance, handleMarkerClick],
  )

  const handleMarkerHover = useCallback((property: PropertyDecorator | null) => {
    setHoveredProperty(property)
  }, [])

  const handleClosePopup = useCallback(() => {
    setSelectedProperty(null)
    setSelectedCluster(null)
  }, [])

  const handleMapChange = useCallback(
    ({ zoom, bounds }: any) => {
      setCurrentZoom(zoom)
      if (onMapBoundsChange && bounds) {
        onMapBoundsChange(bounds)
      }
    },
    [onMapBoundsChange],
  )

  const handleZoomIn = useCallback(() => {
    if (mapInstance) {
      mapInstance.setZoom(mapInstance.getZoom() + 1)
    }
  }, [mapInstance])

  const handleZoomOut = useCallback(() => {
    if (mapInstance) {
      mapInstance.setZoom(mapInstance.getZoom() - 1)
    }
  }, [mapInstance])

  const handleResetView = useCallback(() => {
    if (
      mapInstance &&
      propertiesWithLocation.length > 0 &&
      typeof window !== "undefined" &&
      (window as any).google?.maps
    ) {
      const google = (window as any).google
      const bounds = new google.maps.LatLngBounds()
      propertiesWithLocation.forEach((property) => {
        const [lat, lng] = property.original.point
        bounds.extend(new google.maps.LatLng(lat, lng))
      })
      mapInstance.fitBounds(bounds)
    }
  }, [mapInstance, propertiesWithLocation])

  const handleFullscreen = useCallback(() => {
    // Implement fullscreen functionality
    const mapElement = mapRef.current
    if (mapElement) {
      if (mapElement.requestFullscreen) {
        mapElement.requestFullscreen()
      } else if (mapElement.webkitRequestFullscreen) {
        mapElement.webkitRequestFullscreen()
      } else if (mapElement.mozRequestFullScreen) {
        mapElement.mozRequestFullScreen()
      }
    }
  }, [])

  return (
    <div ref={mapRef} className="h-full w-full relative">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: apiKey,
          libraries: ["geometry", "drawing", "places"],
        }}
        center={mapConfig.center}
        zoom={mapConfig.zoom}
        onChange={handleMapChange}
        onGoogleApiLoaded={({ map }) => {
          setMapInstance(map)
        }}
        yesIWantToUseGoogleMapApiInternals
        options={{
          fullscreenControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          zoomControl: false,
          styles: getMapStyle(mapStyle),
        }}
      >
        {enableClustering
          ? // Render clusters
            clusters.map((cluster) => {
              if (cluster.isCluster) {
                return (
                  <PropertyCluster
                    // @ts-ignore - google-map-react expects lat/lng props
                    lat={cluster.position.lat}
                    lng={cluster.position.lng}
                    key={cluster.id}
                    properties={cluster.properties}
                    onClick={() => handleClusterClick(cluster.properties)}
                  />
                )
              } else {
                const property = cluster.properties[0]
                const isSelected = selectedProperty?.original.id === property.original.id
                const isHovered = hoveredProperty?.original.id === property.original.id

                return (
                  <PropertyMarker
                    // @ts-ignore - google-map-react expects lat/lng props
                    lat={cluster.position.lat}
                    lng={cluster.position.lng}
                    key={property.original.id}
                    property={property}
                    isSelected={isSelected}
                    isHovered={isHovered}
                    onClick={() => handleMarkerClick(property)}
                    onMouseEnter={() => handleMarkerHover(property)}
                    onMouseLeave={() => handleMarkerHover(null)}
                  />
                )
              }
            })
          : // Render individual markers without clustering
            propertiesWithLocation.map((property) => {
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
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        {/* Stats panel */}
        <div className="bg-white rounded-lg shadow-md p-3 text-sm">
          <div className="font-semibold">{searchResults.totalDocs} properties</div>
          <div className="text-muted-foreground">{propertiesWithLocation.length} shown on map</div>
          {enableClustering && (
            <div className="text-muted-foreground">
              {clusters.filter((c) => c.isCluster).length} clusters
            </div>
          )}
        </div>

        {/* Map controls */}
        {enableMapControls && (
          <div className="bg-white rounded-lg shadow-md p-2 flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomIn}
              className="h-8 w-8 p-0"
              title="Zoom in"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomOut}
              className="h-8 w-8 p-0"
              title="Zoom out"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetView}
              className="h-8 w-8 p-0"
              title="Reset view"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFullscreen}
              className="h-8 w-8 p-0"
              title="Fullscreen"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Cluster details panel */}
      {selectedCluster && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 max-h-48 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">{selectedCluster.length} Properties in this area</h3>
            <Button variant="ghost" size="sm" onClick={handleClosePopup} className="h-6 w-6 p-0">
              ×
            </Button>
          </div>
          <div className="space-y-2">
            {selectedCluster.slice(0, 5).map((property) => (
              <div
                key={property.original.id}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                onClick={() => handleMarkerClick(property)}
              >
                <div>
                  <div className="font-medium">{property.original.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {property.original.address.full_address}
                  </div>
                </div>
                <div className="font-semibold">
                  {property.original.price
                    ? `$${property.original.price.toLocaleString()}`
                    : "Price on Request"}
                </div>
              </div>
            ))}
            {selectedCluster.length > 5 && (
              <div className="text-sm text-muted-foreground text-center pt-2">
                And {selectedCluster.length - 5} more properties...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
