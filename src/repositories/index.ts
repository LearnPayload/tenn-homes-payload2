import { PropertyRepository } from './property-repository'

export const db = {
  properties: new PropertyRepository(),
}
