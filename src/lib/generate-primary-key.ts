import { randomBytes } from 'node:crypto'

export function generatePrimaryKey(length: number = 16): string {
  return randomBytes(length).toString('hex')
}
