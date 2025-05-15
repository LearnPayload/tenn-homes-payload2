import { getPayloadClient } from '@/db/client'

export class BaseRepository {
  protected readonly defaultLimit = 10
  protected readonly defaultOffset = 0
  protected readonly defaultSort = '-createdAt'

  protected readonly client: ReturnType<typeof getPayloadClient>

  constructor() {
    this.client = getPayloadClient()
  }
}

export type Constructor<T = {}> = new (...args: any[]) => T
