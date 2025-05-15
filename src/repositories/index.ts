import { BaseRepository } from './base-repository'
import { AddPropertyRepository } from './add-property-repository'

export const repository = new (AddPropertyRepository(BaseRepository))()
