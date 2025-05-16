'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'
import { z } from 'zod'
import { contactAgentAction, contactAgentSchema } from './contact-agent-actions'

export const useContactAgentForm = (
  defaultValues: z.infer<typeof contactAgentSchema> = {
    email: '',
    fullName: '',
    message: '',
  },
) => {
  return useHookFormAction(contactAgentAction, zodResolver(contactAgentSchema), {
    actionProps: {},
    formProps: { defaultValues },
    errorMapProps: {},
  })
}
