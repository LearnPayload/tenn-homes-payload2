import { getPayloadClient } from "@/db/client"
import { FindOptions } from "@/types"
import { notFound } from "next/navigation"
import { CollectionSlug, PaginatedDocs, Where } from "payload"
import { cache } from "react"

/**
 * Type helper to constrain relationship fields to their raw IDs only
 * This represents the document structure at depth 0 (no populated relationships)
 * Ensures populated objects are not passed where only ID references are expected
 * @template T - The document type
 */
export type DepthZeroFields<T> = {
  [K in keyof T]: T[K] extends { id: string | number }
    ? string | number // Convert populated objects to ID
    : T[K] extends Array<{ id: string | number }>
      ? Array<string | number> // Convert populated arrays to ID arrays
      : T[K] extends Array<infer U>
        ? U extends { id: string | number }
          ? Array<string | number> // Handle nested array types
          : T[K] // Keep as-is if not a relationship array
        : T[K] // Keep primitive types as-is
}

export const defaultFindOptions: FindOptions = {
  limit: 100,
  page: 1,
  sort: "relevance",
  depth: 2, // Default to no population
}

/**
 * Type for update data that only accepts depth-0 field values
 * @template T - The document type
 */
export type DataInput<T> = Partial<Omit<DepthZeroFields<T>, "id" | "updatedAt" | "createdAt">>

export abstract class BaseRepository<T, D> {
  abstract collection: CollectionSlug
  abstract DecoratorClass: new (data: T) => D

  async getBySlugOrFail(slug: string): Promise<D> {
    const doc = await this.getBySlug(slug)

    if (!doc) {
      notFound()
    }

    return doc
  }

  async getFirstOrFail(where: Where = {}) {
    const result = await this.getFirst(where)
    if (!result) {
      notFound()
    }

    return result
  }

  getFirst = cache(async (where: Where = {}): Promise<D | null> => {
    const result = await this.getAll(where)
    if (!result || result.totalDocs === 0) {
      return null
    }
    return result.docs[0]
  })

  getBySlug = cache(async (slug: string): Promise<D | null> => {
    const payload = await getPayloadClient()

    const result = (await payload.find({
      collection: this.collection,
      where: { slug: { equals: slug } },
      limit: 1,
    })) as PaginatedDocs<T>

    return this.createDecorator(result.docs[0]) ?? null
  })

  getAll = cache(
    async (
      where: Where = {},
      searchCriteria: FindOptions = defaultFindOptions,
    ): Promise<PaginatedDocs<D>> => {
      const payload = await getPayloadClient()

      const result = (await payload.find({
        collection: this.collection,
        where,
        ...searchCriteria,
      })) as PaginatedDocs<T>

      return {
        ...result,
        docs: result.docs.map((doc) => this.createDecorator(doc)),
      } as PaginatedDocs<D>
    },
  )

  getByID = cache(async (id: number | string): Promise<D> => {
    const payload = await getPayloadClient()

    const result = (await payload.find({
      collection: this.collection,
      where: { id: { equals: id } },
    })) as PaginatedDocs<T>

    if (result.totalDocs === 0) {
      notFound()
    }

    return this.createDecorator(result.docs[0]) //
  })

  /**
   * Finds an existing document or creates a new one
   * @param data - The document data to create if not found
   * @param field - The field to search by
   * @returns Promise resolving to existing or newly created document
   */
  findOrCreate = async (data: DataInput<T>, field: keyof DataInput<T>) => {
    const results = await this.getAll({ [field]: { equals: data[field] } })

    if (results && results.totalDocs > 0) {
      return results.docs[0]
    } else {
      return await this.create(data as DataInput<T>)
    }
  }

  async create(data: DataInput<T>) {
    const payload = await getPayloadClient()
    const createdData = (await payload.create({
      collection: this.collection,
      data,
    })) as T

    return this.createDecorator(createdData) //
  }
  async update(id: string | number, data: Omit<Partial<T>, "id" | "createdAt" | "updatedAt">) {
    const payload = await getPayloadClient()
    await payload.update({
      collection: this.collection,
      id,
      data,
    })
  }
  async delete(id: string | number) {
    const payload = await getPayloadClient()
    await payload.delete({
      collection: this.collection,
      id,
    })
  }

  protected createDecorator(data: T): D {
    return new this.DecoratorClass(data)
  }
}
