import { useMemo } from "react"
import { PropertyDecorator } from "@/repository/property/property-decorator"

export interface ClusterItem {
  id: string
  position: { lat: number; lng: number }
  properties: PropertyDecorator[]
  isCluster: boolean
}

interface UseMapClusteringProps {
  properties: PropertyDecorator[]
  zoom: number
  clusterRadius?: number // pixels
}

/**
 * Simple clustering algorithm for map markers
 * Groups properties that are close together into clusters
 */
export function useMapClustering({
  properties,
  zoom,
  clusterRadius = 50,
}: UseMapClusteringProps): ClusterItem[] {
  return useMemo(() => {
    // Filter properties with valid coordinates
    const validProperties = properties.filter((property) => {
      const point = property.original.point
      return point && Array.isArray(point) && point.length === 2 && point[0] && point[1]
    })

    // At high zoom levels, don't cluster
    if (zoom >= 14 || validProperties.length <= 1) {
      return validProperties.map((property) => {
        const [lat, lng] = property.original.point
        return {
          id: property.original.id,
          position: { lat, lng },
          properties: [property],
          isCluster: false,
        }
      })
    }

    // Simple grid-based clustering
    const clusters: ClusterItem[] = []
    const processed = new Set<string>()

    // Calculate grid size based on zoom level
    const gridSize = getGridSize(zoom)

    validProperties.forEach((property) => {
      if (processed.has(property.original.id)) return

      const [lat, lng] = property.original.point
      const clusterProperties = [property]
      processed.add(property.original.id)

      // Find nearby properties to cluster
      validProperties.forEach((otherProperty) => {
        if (processed.has(otherProperty.original.id)) return

        const [otherLat, otherLng] = otherProperty.original.point
        const distance = calculateDistance(lat, lng, otherLat, otherLng)

        // If properties are close enough, add to cluster
        if (distance < gridSize) {
          clusterProperties.push(otherProperty)
          processed.add(otherProperty.original.id)
        }
      })

      // Calculate cluster center
      const centerLat =
        clusterProperties.reduce((sum, p) => {
          return sum + p.original.point[0]
        }, 0) / clusterProperties.length

      const centerLng =
        clusterProperties.reduce((sum, p) => {
          return sum + p.original.point[1]
        }, 0) / clusterProperties.length

      clusters.push({
        id: clusterProperties.map((p) => p.original.id).join("-"),
        position: { lat: centerLat, lng: centerLng },
        properties: clusterProperties,
        isCluster: clusterProperties.length > 1,
      })
    })

    return clusters
  }, [properties, zoom, clusterRadius])
}

/**
 * Calculate distance between two points in kilometers
 */
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1)
  const dLng = toRadians(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

/**
 * Get grid size for clustering based on zoom level
 */
function getGridSize(zoom: number): number {
  // Adjust these values based on your needs
  const gridSizes: Record<number, number> = {
    1: 50, // Very wide clustering at low zoom
    2: 40,
    3: 30,
    4: 25,
    5: 20,
    6: 15,
    7: 12,
    8: 10,
    9: 8,
    10: 6,
    11: 4,
    12: 2,
    13: 1,
    14: 0.5, // Minimal clustering at high zoom
  }

  return gridSizes[Math.floor(zoom)] || 0.5
}
