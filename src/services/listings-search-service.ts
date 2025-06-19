import { DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE } from "@/constants"
import { SearchCriteria } from "@/lib/search-utils"
import { Property } from "@/payload-types"
import { local } from "@/repository"
import { PaginatedDocs, Where } from "payload"

export class ListingsSearchService {
  async search(criteria: SearchCriteria): Promise<any> {
    const where: Where = {}

    if (criteria.filters.city) {
      where["location.slug"] = { equals: criteria.filters.city }
    }
    if (criteria.filters.zip) {
      where["location.zip"] = { equals: criteria.filters.zip }
    }
    if (criteria.filters["min-price"] || criteria.filters["max-price"]) {
      where.price = {
        greater_than_equal: criteria.filters["min-price"] || DEFAULT_MIN_PRICE,
        less_than_equal: criteria.filters["max-price"] || DEFAULT_MAX_PRICE,
      }
    }
    if (criteria.filters["min-beds"]) {
      where["details.bedrooms"] = {
        greater_than_equal: criteria.filters["min-beds"] || 6,
      }
    }
    if (criteria.filters["min-baths"]) {
      where["details.bathrooms"] = {
        greater_than_equal: criteria.filters["min-baths"],
      }
    }

    if (criteria.filters["property-status"]) {
      where.listingStatus = {
        equals: criteria.filters["property-status"],
      }
    }

    if (Array.isArray(criteria.filters["property-type"])) {
      where["details.propertyType"] = {
        in: criteria.filters["property-type"],
      }
    }

    const results = await local.property.getAll(where, criteria.options)

    const data = {
      ...results,
      docs: results?.docs.map((d) => d.original),
    } as PaginatedDocs<Property>

    return data
  }
}
