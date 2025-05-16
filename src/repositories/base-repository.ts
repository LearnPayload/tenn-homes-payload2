import { getPayloadClient } from '@/db/client'
import { Payload } from 'payload'

export class BaseRepository {
  protected readonly defaultLimit = 10
  protected readonly defaultOffset = 0
  protected readonly defaultSort = '-createdAt'

  protected readonly client: Promise<Payload>

  constructor() {
    this.client = getPayloadClient()
  }
}
