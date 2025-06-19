"use client"

import { PropertyDecorator } from "@/repository/property/property-decorator"
import { formatPrice } from "@/lib/format-price"
import { Button } from "@/components/ui/button"
import { Bed, Bath, Square } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { PropertyStatus } from "@/components/property/status"
import { PropertyShare } from "@/components/property/share"

interface PropertyPopupProps {
  property: PropertyDecorator
  onClose: () => void
  position: { lat: number; lng: number }
}

export const PropertyPopup = ({ property, onClose, position }: PropertyPopupProps) => {
  const details = property.original.details
  const photos = property.original.photos as any[]
  const firstPhoto = photos?.[0]
  const propertyType = details?.propertyType

  return (
    <Card className="py-0 border w-80 overflow-hidden -translate-x-1/2 translate-y-8">
      <CardContent className="p-0">
        <div className="absolute p-2 right-0 top-0 left-0 z-10 flex items-center justify-between gap-2">
          <PropertyStatus listingStatus={property.original.listingStatus} />
          <PropertyShare />
        </div>
        {/* Property image */}
        {firstPhoto && (
          <div className="relative h-48">
            <Image
              src={typeof firstPhoto === "object" ? firstPhoto.url || "" : ""}
              alt={property.original.title}
              fill
              className="object-cover"
              sizes="(max-width: 320px) 320px, 320px"
            />
          </div>
        )}
        {/* Content */}
        <div className="grid gap-2 p-4">
          {/* Price */}
          <div className="text-2xl font-bold text-primary">
            {property.original.price ? formatPrice(property.original.price) : "Price on Request"}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-lg leading-tight">{property.original.title}</h3>

          {/* Address */}
          <p className="text-sm text-muted-foreground">{property.original.address.full_address}</p>

          {/* Property details */}
          {details && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {details.bedrooms && (
                <div className="flex items-center gap-1">
                  <Bed className="h-4 w-4" />
                  <span>
                    {details.bedrooms} bed{details.bedrooms !== 1 ? "s" : ""}
                  </span>
                </div>
              )}
              {details.bathrooms && (
                <div className="flex items-center gap-1">
                  <Bath className="h-4 w-4" />
                  <span>
                    {details.bathrooms} bath{details.bathrooms !== 1 ? "s" : ""}
                  </span>
                </div>
              )}
              {details.squareFeet && (
                <div className="flex items-center gap-1">
                  <Square className="h-4 w-4" />
                  <span>{details.squareFeet.toLocaleString()} sqft</span>
                </div>
              )}
            </div>
          )}

          {/* Description preview */}
          {property.original.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {property.original.description}
            </p>
          )}

          {/* View details button */}

          <CardFooter className="justify-between px-0">
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
            <Button asChild>
              <Link href={property.url}>View Details</Link>
            </Button>
          </CardFooter>
        </div>
      </CardContent>
    </Card>
  )
}
