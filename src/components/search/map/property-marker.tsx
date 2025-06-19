"use client"

import { PropertyDecorator } from "@/repository/property/property-decorator"
import { formatPrice, formatPriceShort } from "@/lib/format-price"
import { cn } from "@/lib/utils"

interface PropertyMarkerProps {
  property: PropertyDecorator
  isSelected?: boolean
  isHovered?: boolean
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export const PropertyMarker = ({
  property,
  isSelected = false,
  isHovered = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: PropertyMarkerProps) => {
  const price = property.original.price
    ? formatPriceShort(property.original.price)
    : "Price on Request"

  return (
    <div
      className={cn(
        "relative cursor-pointer transition-all duration-200 transform flex items-center justify-center",
        isSelected && "scale-110 z-20",
        isHovered && "scale-105 z-10",
      )}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Price tag */}
      <div
        className={cn(
          "bg-white w-fit rounded-lg px-3 py-2 font-semibold text-sm whitespace-nowrap",
          isSelected && "bg-primary text-primary-foreground border-primary",
        )}
      >
        {price}
      </div>

      {/* Arrow pointing down */}
      <div
        className={cn(
          "absolute left-1/2 top-full -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent",
          isSelected ? "border-t-primary" : "border-t-white",
        )}
        style={{
          filter: isSelected ? "none" : "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
        }}
      />
    </div>
  )
}
