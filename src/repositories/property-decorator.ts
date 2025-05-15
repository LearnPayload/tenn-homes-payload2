import { formatPrice } from '@/lib/format-price'
import route from '@/lib/routes'
import type { Feature, Property, Location as LocationType, Media } from '@/payload-types'
import slugify from 'slugify'

export type DecoratedProperty = Property & {
  original: Property
  price: string
  details: {
    bedrooms: number
    bathrooms: number
    squareFeet: string
    lotSize: string
    yearBuilt: number
  }
  features: Feature[]
  url: string
  photos: DecoratedPhoto[]
}

export type DecoratedPhoto = {
  id: string
  url: string | null
  alt: string
}

export class PropertyDecorator {
  constructor(readonly original: Property) {}

  get price(): string {
    return formatPrice(this.original.price)
  }

  get photos() {
    const photos = (this.original.photos ?? []) as Media[]
    const decoratedPhotos = photos
      .filter((p) => !!p.url)
      .map((photo) => ({
        id: photo.id,
        url: photo.url!,
        alt: photo.alt,
      }))

    return decoratedPhotos
  }

  get details() {
    return {
      bedrooms: this.original.details?.bedrooms ?? 0,
      bathrooms: this.original.details?.bathrooms ?? 0,
      squareFeet: this.original.details?.squareFeet?.toLocaleString() ?? '0',
      lotSize: this.original.details?.lotSize?.toLocaleString() ?? '0',
      yearBuilt: this.original.details?.yearBuilt ?? 0,
    }
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

  toJSON(): DecoratedProperty {
    return {
      ...this.original,
      original: this.original,
      price: this.price,
      details: this.details,
      features: this.features,
      url: this.url,
      photos: this.photos,
    } as DecoratedProperty
  }
}
