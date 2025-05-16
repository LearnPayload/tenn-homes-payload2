import { generatePrimaryKey } from '@/lib/generate-primary-key'
import { Field } from 'payload'

export const customPrimaryKey: Field[] = [
  {
    name: 'id',
    type: 'text',
    required: true,
    unique: true,
    admin: {
      disabled: true,
    },
    defaultValue: generatePrimaryKey.bind(null, 8),
  },
]
