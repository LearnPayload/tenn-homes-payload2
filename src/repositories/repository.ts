import { DecoratedProperty, PropertyDecorator } from '@/repositories/property-decorator'

interface QueryParams {
  limit?: number
  page?: number
}

export interface PropertyQueryParams extends QueryParams {
  type?: string
  zip?: string
  price?: number
}

export interface PropertyRepository {
  getProperties(params: PropertyQueryParams, userId?: string): Promise<DecoratedProperty[]>
  getProperty(id: string): Promise<DecoratedProperty | null>
  //   create(property: PropertyType): Promise<Property>
  //   update(id: string, property: PropertyType): Promise<Property | null>
  //   delete(id: string): Promise<boolean>
}
