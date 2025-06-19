import { ContactService } from "./contact-service"
import { ListingsSearchService } from "./listings-search-service"

export const service = {
  contact: new ContactService(),
  listings: new ListingsSearchService(),
}
