import { DecoratedProperty } from '@/repositories/property-decorator'
import { CollectionConfig, Where } from 'payload'

interface QueryParams {
  limit?: number
  page?: number
  where?: Where
  sort?: string
}

export interface PropertyQueryParams extends QueryParams {}

export interface BaseRepositoryInterface<T, TQueryParams extends QueryParams> {
  collection: CollectionConfig['slug']
  getMany(params: TQueryParams): Promise<T[]>
  getOne(id: string): Promise<T | null>
}

export interface PropertyRepositoryInterface
  extends BaseRepositoryInterface<DecoratedProperty, PropertyQueryParams> {}
