import { getPayload as getPayloadClient } from 'payload'
import config from '../payload.config'

export const getPayload = async () => {
  return await getPayloadClient({
    config,
  })
}
