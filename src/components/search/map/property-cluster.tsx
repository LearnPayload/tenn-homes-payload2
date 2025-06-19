"use client"

import { PropertyDecorator } from "@/repository/property/property-decorator"
import { cn } from "@/lib/utils"

interface PropertyClusterProps {
  properties: PropertyDecorator[]
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export const PropertyCluster = ({
  properties,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: PropertyClusterProps) => {
  const count = properties.length

  // Don't render cluster for single property
  if (count <= 1) return null

  // Determine cluster size based on count
  const getClusterSize = (count: number) => {
    if (count < 3) return "size-5 border-2 border-white0/50 text-xs"
    if (count < 6) return "size-7 border-2 border-white/50 text-sm"
    if (count < 10) return "size-8 border-3 border-white/50 text-base"
    if (count < 50) return "size-10 border-3 border-white/50 text-lg"
    if (count < 50) return "size-12 border-4 border-white/50 text-xl"
    return "large"
  }

  const size = getClusterSize(count)

  return (
    <div
      className={cn(
        "relative cursor-pointer transition-all duration-200 transform hover:scale-110",
        "flex items-center justify-center rounded-full bg-primary text-white font-bold shadow-lg",
        size,
      )}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {count}

      {/* Pulse animation for large clusters */}
      {size === "large" && (
        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
      )}
    </div>
  )
}
