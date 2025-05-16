import { z } from 'zod'

// Create and export the schema directly
export const contactAgentSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    fullName: z.string().min(1, 'Name is required').optional(),
    message: z.string().min(1, 'Message is required').optional(),
  })
  .strict()

export type ContactAgentProps = z.infer<typeof contactAgentSchema>

// Add a debug log to verify schema initialization
console.log('Schema initialized:', {
  hasSafeParse: typeof contactAgentSchema.safeParse === 'function',
  schemaKeys: Object.keys(contactAgentSchema),
})
