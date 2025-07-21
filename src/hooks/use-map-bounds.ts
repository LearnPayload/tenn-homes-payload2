import { useMemo } from "react"
import { PropertyDecorator } from "@/repository/property/property-decorator"

interface MapCoords {
  lat: number
  lng: number
}

interface MapBounds {
  center: MapCoords
  zoom: number
}

// Default center (Nashville, TN)
const DEFAULT_CENTER: MapCoords = {
  lat: 36.1627,
  lng: -86.7816
}

const DEFAULT_ZOOM = 11

export function useMapBounds(properties: PropertyDecorator[]): MapBounds {
  return useMemo(() => {
    // Filter properties that have valid coordinates
    const propertiesWithLocation = properties.filter((property) => {
      const point = property.original.point
      return point && Array.isArray(point) && point.length === 2 && point[0] && point[1]
    })

    if (propertiesWithLocation.length === 0) {
      return {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM
      }
    }

    if (propertiesWithLocation.length === 1) {
      const [lat, lng] = propertiesWithLocation[0].original.point
      return {
        center: {
          lat: lat,
          lng: lng
        },
        zoom: 14
      }
    }

    // Calculate bounds for multiple properties
    const latitudes = propertiesWithLocation.map(p => p.original.point[0])
    const longitudes = propertiesWithLocation.map(p => p.original.point[1])
    
    const minLat = Math.min(...latitudes)
    const maxLat = Math.max(...latitudes)
    const minLng = Math.min(...longitudes)
    const maxLng = Math.max(...longitudes)
    
    const centerLat = (minLat + maxLat) / 2
    const centerLng = (minLng + maxLng) / 2
    
    // Calculate zoom level based on bounds
    const latDiff = maxLat - minLat
    const lngDiff = maxLng - minLng
    const maxDiff = Math.max(latDiff, lngDiff)
    
    let zoom = DEFAULT_ZOOM
    if (maxDiff < 0.01) zoom = 15
    else if (maxDiff < 0.02) zoom = 14
    else if (maxDiff < 0.05) zoom = 13
    else if (maxDiff < 0.1) zoom = 12
    else if (maxDiff < 0.2) zoom = 11
    else if (maxDiff < 0.5) zoom = 10
    else zoom = 9

    return {
      center: {
        lat: centerLat,
        lng: centerLng
      },
      zoom
    }
  }, [properties])
}

export function getPropertiesWithLocation(properties: PropertyDecorator[]) {
  return properties.filter((property) => {
    const point = property.original.point
    return point && Array.isArray(point) && point.length === 2 && point[0] && point[1]
  })
}