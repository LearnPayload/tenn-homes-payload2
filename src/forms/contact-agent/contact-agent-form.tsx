'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useContactAgentForm } from './use-contact-agent-form'
import { SendIcon } from 'lucide-react'

export const ContactAgentForm = () => {
  const {
    form,
    action: { isPending },
    handleSubmitWithAction,
  } = useContactAgentForm({
    email: 'user@example.com',
    fullName: 'Average Joe',
    message: 'I am interested in this property',
  })
  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="flex-1 w-full grid grid-cols-1 gap-2">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your message" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          size={'lg'}
          disabled={isPending}
          loading={isPending}
        >
          <SendIcon size={16} /> Send
        </Button>
      </form>
    </Form>
  )
}
