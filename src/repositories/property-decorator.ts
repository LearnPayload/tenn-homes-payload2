import { PropertyType } from '@/config/collections/Properties/property-type-options'
import { HeatingType } from '@/config/collections/Properties/heating-type-options'
import { formatPrice } from '@/lib/format-price'
import route from '@/lib/routes'
import type { Feature, Property, Location as LocationType, Media, Location } from '@/payload-types'
import slugify from 'slugify'
import { ListingStatus } from '@/config/collections/Properties/listing-status-map'

export type DecoratedProperty = {
  original: Property
  title: string
  description: string
  price: string
  address: Property['address']
  listingStatus: ListingStatus
  details: {
    bedrooms: number
    bathrooms: number
    squareFeet: string
    lotSize: string
    yearBuilt: number
    propertyType: PropertyType
    heatingType: HeatingType
  }
  features: Feature[]
  url: string
  photos: DecoratedPhoto[]
  agent: Property['agent']
}

export type DecoratedPhoto = {
  id: number
  url: string | null
  alt: string
}

export class PropertyDecorator {
  constructor(readonly original: Property) {}

  get title(): string {
    return this.original.title
  }

  get description(): string {
    return this.original.description
  }

  get price(): string {
    return formatPrice(this.original.price)
  }

  get address(): Property['address'] {
    return this.original.address
  }

  get photos(): DecoratedPhoto[] {
    const photos = (this.original.photos ?? []) as Media[]
    const decoratedPhotos = photos
      .filter((p) => !!p.url)
      .map((photo) => {
        return {
          id: photo.id,
          url: photo.url!,
          alt: photo.alt,
        }
      })

    return decoratedPhotos
  }

  get details(): DecoratedProperty['details'] {
    return {
      bedrooms: this.original.details?.bedrooms ?? 0,
      bathrooms: this.original.details?.bathrooms ?? 0,
      squareFeet: this.original.details?.squareFeet?.toLocaleString() ?? '0',
      lotSize: this.original.details?.lotSize?.toLocaleString() ?? '0',
      yearBuilt: this.original.details?.yearBuilt ?? 0,
      propertyType: this.original.details?.propertyType as PropertyType,
      heatingType: this.original.details?.heatingType as HeatingType,
    }
  }

  get listingStatus(): ListingStatus {
    return this.original.listingStatus
  }

  get features(): Feature[] {
    if (!this.original.features) return []
    const features = this.original.features as Feature[]
    return features
  }

  get url(): string {
    const location = this.original.location as LocationType
    const fullAddress = [
      this.original.street,
      location.city,
      location.state_abbr,
      location.zip,
    ].map((l) => slugify(`${l}`, { lower: true }))

    return route('property.show', {
      id: this.original.id,
      full_address: fullAddress.join('/'),
    })
  }

  get agent() {
    return this.original.agent
  }

  toJSON(): DecoratedProperty {
    return {
      title: this.title,
      description: this.description,
      address: this.address,
      agent: this.agent,
      price: this.price,
      listingStatus: this.listingStatus,
      details: this.details,
      features: this.features,
      url: this.url,
      photos: this.photos,
      original: this.original,
    }
  }
}
