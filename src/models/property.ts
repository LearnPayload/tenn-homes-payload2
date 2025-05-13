import { formatPrice } from '@/lib/format-price'
import route from '@/lib/routes'
import type { Property as PropertyType, Location as LocationType, Media } from '@/payload-types'
import slugify from 'slugify'

export class Property {
  constructor(readonly data: PropertyType) {}

  get title(): string {
    return this.data.title
  }

  get formattedAddress(): string {
    if (!this.data.formattedAddress) return 'n/a'
    return this.data.formattedAddress
  }

  get features(): PropertyType['features'] {
    return this.data.features
  }

  get price(): string {
    return formatPrice(this.data.price)
  }

  get listingStatus(): PropertyType['listingStatus'] {
    return this.data.listingStatus
  }

  get photos(): Media[] {
    return this.data.photos as Media[]
  }

  get url(): string {
    const location = this.data.location as LocationType
    const fullAddress = [this.data.street, location.city, location.state_abbr, location.zip].map(
      (l) => slugify(`${l}`, { lower: true }),
    )

    // /home/555-e-main/knoxville/tn/33333/345345345345

    console.log({ fullAddress })

    return route('property.show', {
      id: this.data.id,
      full_address: fullAddress.join('/'),
    })
  }
}

// const property = new Property(...)
// {property.title}
