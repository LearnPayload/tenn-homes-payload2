"use client"
import { listingStatusMap } from "@/config/collections/Properties/listing-status-map"
import { cn } from "@/lib/utils"
import { Badge } from "../ui/badge"
import { Property } from "@/payload-types"

export const PropertyStatus = ({ listingStatus }: { listingStatus: Property["listingStatus"] }) => {
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
