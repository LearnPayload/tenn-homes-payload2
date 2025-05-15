import { DecoratedProperty, PropertyDecorator } from '@/repositories/property-decorator'
import { Card, CardContent } from '../ui/card'
import { PropertyStatus } from './status'
import { Media } from '@/payload-types'
import { MapPin } from 'lucide-react'
import Link from 'next/link'

export const FeaturedPropertyCard = ({ property }: { property: DecoratedProperty }) => {
  const images = property?.photos as Media[]
  const featureImage = images[0] ?? { url: 'https://placehold.co/600x400', alt: property.title }
  return (
    <Link href={property.url} className="group block relative h-full">
      <Card className="overflow-hidden py-0 h-full group-hover:shadow-md gap-0">
        <div className="relative">
          <img
            src={featureImage.url!}
            alt={featureImage.alt}
            width={600}
            height={400}
            className="object-cover h-[210px] w-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <PropertyStatus listingStatus={property.listingStatus} />
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-1 line-clamp-1">{property.title}</h3>
          <div className="line-clamp-2">
            <span className="font-semibold">{property.address?.street}</span>,{' '}
            <span>{property.address?.city}</span>, <span>{property.address?.state_abbr}</span>{' '}
            <span>{property.address?.zip}</span>
          </div>
          <p className="text-primary font-bold mb-2">{property.price}</p>
          <div className="flex items-center text-muted-foreground text-sm mb-3">
            <MapPin className="h-3 w-3 mr-1" />
            <span>
              {property.address?.city}, {property.address?.state_abbr}
            </span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground border-t pt-3">
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2 22h20M2 11h20M15 2H9l-3 9h12l-3-9z"
                />
              </svg>
              3
            </span>
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              2
            </span>
            <span className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                />
              </svg>
              2,100 Sq Ft
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
