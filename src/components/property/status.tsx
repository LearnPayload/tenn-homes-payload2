"use client"
import { listingStatusMap } from "@/config/collections/Properties/listing-status-map"
import { cn } from "@/lib/utils"
import { useProperty } from "../providers/property"
import { Badge } from "../ui/badge"

export const PropertyStatus = () => {
  const property = useProperty()

  const listingStatus = property.listingStatus
  return (
    <Badge
      className={cn(
        "uppercase rounded-xs",
        listingStatusMap[listingStatus].color,
        listingStatusMap[listingStatus].foreground,
      )}
    >
      {listingStatusMap[listingStatus].label}
    </Badge>
  )
}
