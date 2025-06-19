import { BathIcon, BedDoubleIcon, RulerIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useProperty } from "../providers/property"
import { PropertyStatus } from "../property/status"
import { PropertyShare } from "../property/share"

export const PropertySearchCard = () => {
  const property = useProperty()

  const featureImage = property.photos[0] ?? {
    url: "https://placehold.co/400x300",
    alt: property.title,
  }

  return (
    <Link
      href={property.url}
      className="group block border rounded-lg hover:bg-gray-50 transition-colors overflow-hidden"
    >
      <div className="">
        <div className="flex flex-col">
          <div className="relative flex-shrink-0">
            <Image
              src={featureImage.url!}
              alt={featureImage.alt}
              width={120}
              height={90}
              className="object-cover w-full aspect-video transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-2 left-2">
              <PropertyStatus listingStatus={property.listingStatus} />
            </div>
          </div>

          <div className="flex-1 min-w-0 p-4 relative">
            <div className="absolute top-2 right-2 flex items-center gap-2">
              <PropertyShare />
            </div>
            <div className="grid gap-2">
              <div>
                <h3 className="font-semibold text-lg text-primary">{property.price}</h3>
                <div className="line-clamp-2 text-sm transition-all group-hover:text-amber-800">
                  <span className="font-semibold">{property.address?.street}</span>,{" "}
                  <span>{property.address?.city}</span>, <span>{property.address?.state_abbr}</span>{" "}
                  <span>{property.address?.zip}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <BedDoubleIcon size={14} />
                  {property.details.bedrooms} beds
                </span>
                <span className="flex items-center gap-1">
                  <BathIcon size={14} />
                  {property.details.bathrooms} baths
                </span>
                <span className="flex items-center gap-1">
                  <RulerIcon size={14} />
                  {property.details.squareFeet?.toLocaleString()} sqft
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
