import { SearchCriteria } from "@/lib/search-utils"
import { Property } from "@/payload-types"
import { local } from "@/repository"
import { PaginatedDocs, Where } from "payload"

export class ListingsSearchService {
  async search(criteria: SearchCriteria): Promise<any> {
    const where: Where = {}
    where.listingStatus = { equals: criteria.filters["property-status"] || "forsale" }

    if (criteria.filters.city) {
      where["location.city_slug"] = { equals: criteria.filters.city }
    }
    if (criteria.filters.zip) {
      where["location.zip"] = { equals: criteria.filters.zip }
    }
    if (criteria.filters["min-price"] || criteria.filters["max-price"]) {
      where.price = {
        greater_than_equal: criteria.filters["min-price"] || 0,
        less_than_equal: criteria.filters["max-price"] || 10000000,
      }
    }
    if (criteria.filters["min-beds"]) {
      where["details.bedrooms"] = {
        greater_than_equal: criteria.filters["min-beds"] || 6,
      }
    }
    if (criteria.filters["min-baths"]) {
      where["details.bathrooms"] = {
        greater_than_equal: criteria.filters["min-baths"] || 6,
      }
    }
    if (criteria.filters["property-type"]) {
      where["details.propertyType"] = {
        equals: criteria.filters["property-type"] || "house",
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
