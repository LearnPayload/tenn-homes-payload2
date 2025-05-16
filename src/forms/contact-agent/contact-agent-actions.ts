'use server'

import { actionClient } from '@/lib/safe-action'
import { contactAgentSchema } from './schema'

export const contactAgentAction = actionClient
  .schema(contactAgentSchema)
  .action(async ({ parsedInput }) => {
    try {
      const { email, fullName, message } = parsedInput
      // TODO: Implement actual form submission logic here
      // For now, just log and return success
      console.log('Form submitted:', { email, fullName, message })
      return { success: true, message: 'Form submitted successfully' }
    } catch (error) {
      console.error('Server action error:', error)
      throw error
    }
  })
