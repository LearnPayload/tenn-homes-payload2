import { ContactService } from "./contact-service"
import { ListingsSearchService } from "./property-search-service"

export const service = {
  contact: new ContactService(),
  listings: new ListingsSearchService(),
}
