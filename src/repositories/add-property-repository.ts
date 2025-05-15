import { BaseRepository, Constructor } from './base-repository'
import { PropertyQueryParams, PropertyRepository } from './repository'
import { DecoratedProperty, PropertyDecorator } from './property-decorator'
import { notFound } from 'next/navigation'
import { cache } from 'react'

export function AddPropertyRepository<TBase extends Constructor<BaseRepository>>(Base: TBase) {
  return class PropertyRepositoryMixin extends Base implements PropertyRepository {
    getProperty = cache(async (id: string): Promise<DecoratedProperty> => {
      const payload = await this.client
      console.log('getProperty', id)
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

    getProperties = cache(
      async (query: PropertyQueryParams = {}, userId?: string): Promise<DecoratedProperty[]> => {
        const payload = await this.client
        const properties = await payload.find({
          collection: 'properties',
          where: {},
          page: query.page,
          limit: query.limit,
          sort: this.defaultSort,
        })

        return properties.docs.map((property) => {
          return new PropertyDecorator(property).toJSON()
        })
      },
    )
  }
}
