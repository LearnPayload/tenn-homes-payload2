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
  } = useContactAgentForm()
  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="flex-1 w-full grid grid-cols-1 gap-2">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => <Input placeholder="Enter your name" {...field} />}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => <Input placeholder="Enter your email" {...field} />}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => <Textarea placeholder="Enter your message" {...field} />}
        />
        <Button type="submit" className="w-full" size={'lg'} disabled={true} loading={true}>
          <SendIcon size={16} /> Send
        </Button>
      </form>
    </Form>
  )
}
