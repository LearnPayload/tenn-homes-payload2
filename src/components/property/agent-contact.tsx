'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MailIcon, PhoneCallIcon } from 'lucide-react'
import { useProperty } from './context'

export const AgentContact = () => {
  const property = useProperty()

  if (!property.agent || typeof property.agent === 'string') return null
  return (
    <div className="bg-white rounded-lg p-6 flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <Avatar className="size-12">
          <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-4">
          <div>
            <h4 className="text-lg font-semibold">
              {property.agent.firstName} {property.agent.lastName}
            </h4>
            <p className="text-sm text-muted-foreground">Licensed Real Estate Agent in Tennessee</p>
            <p className="text-muted-foreground text-xs">License #123456</p>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <PhoneCallIcon size={16} />
              <a href={`tel:${property.agent.phone}`}>{property.agent.phone}</a>
            </div>
            <div className="flex items-center gap-2">
              <MailIcon size={16} />
              <a href={`mailto:${property.agent.email}`}>{property.agent.email}</a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Input placeholder="Enter your name" />
        <Input placeholder="Enter your email" />
        <Textarea placeholder="Enter your message" />

        <Button className="w-full" size={'lg'}>
          Send
        </Button>
      </div>
    </div>
  )
}
