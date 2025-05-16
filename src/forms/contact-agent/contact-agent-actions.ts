'use server'

import { z } from 'zod'
import { actionClient } from '@/lib/safe-action'

export const contactAgentSchema = z.object({
  email: z.string().email(),
  fullName: z.string().optional(),
  message: z.string().optional(),
})

export type ContactAgentProps = z.infer<typeof contactAgentSchema>

export const contactAgentAction = actionClient
  .schema(contactAgentSchema)
  .action(async ({ parsedInput: { email, fullName, message } }) => {
    console.log({ email, fullName, message })
  })
