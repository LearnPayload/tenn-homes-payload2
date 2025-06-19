// Map utility functions for URL state management and bounds calculation

export interface MapBounds {
  north: number
  south: number
  east: number
  west: number
}

export interface MapViewport {
  center: {
    lat: number
    lng: number
  }
  zoom: number
  bounds?: MapBounds
}

/**
 * Convert map bounds to a URL-safe string
 */
export function mapBoundsToString(bounds: MapBounds): string {
  return `${bounds.north},${bounds.south},${bounds.east},${bounds.west}`
}

/**
 * Parse map bounds from a URL string
 */
export function mapBoundsFromString(boundsString: string): MapBounds | null {
  try {
    const [north, south, east, west] = boundsString.split(',').map(Number)
    if ([north, south, east, west].some(isNaN)) {
      return null
    }
    return { north, south, east, west }
  } catch {
    return null
  }
}

/**
 * Calculate if a point is within the given bounds
 */
export function isPointInBounds(
  point: { lat: number; lng: number },
  bounds: MapBounds
): boolean {
  return (
    point.lat >= bounds.south &&
    point.lat <= bounds.north &&
    point.lng >= bounds.west &&
    point.lng <= bounds.east
  )
}

/**
 * Calculate bounds from an array of coordinates
 */
export function calculateBounds(coordinates: Array<{ lat: number; lng: number }>): MapBounds | null {
  if (coordinates.length === 0) return null

  let north = coordinates[0].lat
  let south = coordinates[0].lat
  let east = coordinates[0].lng
  let west = coordinates[0].lng

  coordinates.forEach(coord => {
    north = Math.max(north, coord.lat)
    south = Math.min(south, coord.lat)
    east = Math.max(east, coord.lng)
    west = Math.min(west, coord.lng)
  })

  return { north, south, east, west }
}

/**
 * Add padding to bounds (useful for map fitting)
 */
export function padBounds(bounds: MapBounds, paddingPercent: number = 0.1): MapBounds {
  const latPadding = (bounds.north - bounds.south) * paddingPercent
  const lngPadding = (bounds.east - bounds.west) * paddingPercent

  return {
    north: bounds.north + latPadding,
    south: bounds.south - latPadding,
    east: bounds.east + lngPadding,
    west: bounds.west - lngPadding,
  }
}

/**
 * Calculate the center point of bounds
 */
export function getBoundsCenter(bounds: MapBounds): { lat: number; lng: number } {
  return {
    lat: (bounds.north + bounds.south) / 2,
    lng: (bounds.east + bounds.west) / 2,
  }
}

/**
 * Calculate appropriate zoom level for bounds
 * This is a simplified calculation - actual implementation would depend on viewport size
 */
export function getZoomForBounds(bounds: MapBounds, viewportSize?: { width: number; height: number }): number {
  const latDiff = bounds.north - bounds.south
  const lngDiff = bounds.east - bounds.west
  const maxDiff = Math.max(latDiff, lngDiff)

  // Simple zoom calculation - can be refined based on viewport
  if (maxDiff < 0.01) return 15
  if (maxDiff < 0.02) return 14
  if (maxDiff < 0.05) return 13
  if (maxDiff < 0.1) return 12
  if (maxDiff < 0.2) return 11
  if (maxDiff < 0.5) return 10
  if (maxDiff < 1) return 9
  if (maxDiff < 2) return 8
  return 7
}

/**
 * Validate if bounds are valid
 */
export function isValidBounds(bounds: MapBounds): boolean {
  return (
    bounds.north > bounds.south &&
    bounds.east > bounds.west &&
    bounds.north >= -90 && bounds.north <= 90 &&
    bounds.south >= -90 && bounds.south <= 90 &&
    bounds.east >= -180 && bounds.east <= 180 &&
    bounds.west >= -180 && bounds.west <= 180
  )
}