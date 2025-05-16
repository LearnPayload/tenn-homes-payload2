import { BaseRepository } from './base-repository'
import { PropertyQueryParams, PropertyRepositoryInterface } from './repository'
import { DecoratedProperty, PropertyDecorator } from './property-decorator'
import { forbidden, notFound } from 'next/navigation'
import { cache } from 'react'

export class PropertyRepository extends BaseRepository implements PropertyRepositoryInterface {
  getOne = cache(async (id: string): Promise<DecoratedProperty> => {
    const payload = await this.client
    try {
      const property = await payload.findByID({
        collection: 'properties',
        id,
      })
      return new PropertyDecorator(property).toJSON()
    } catch (error) {
      notFound()
    }
  })

  getMany = cache(async (query: PropertyQueryParams = {}): Promise<DecoratedProperty[]> => {
    const payload = await this.client
    const properties = await payload.find({
      collection: 'properties',
      where: query.where,
      page: query.page,
      limit: query.limit,
      sort: query.sort ?? this.defaultSort,
    })

    return properties.docs.map((property) => {
      return new PropertyDecorator(property).toJSON()
    })
  })
}
