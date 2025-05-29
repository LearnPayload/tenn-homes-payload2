"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MailIcon, PhoneCallIcon } from "lucide-react"
import { useProperty } from "./context"
import { Media } from "@/payload-types"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

const backgroundColors = [
  "#D8E2DC", // Ash gray
  "#FFE5D9", // Pale peach
  "#DBCDF0", // Soft lavender
  "#C7CEEA", // Periwinkle blue
  "#E2CFC4", // Taupe
  "#F2D0A9", // Mellow apricot
  "#C1D3FE", // Baby blue
  "#D0F4DE", // Mint green
  "#F1E3D3", // Cream
  "#C6DEF1", // Powder blue
]

export const PropertyInquiry = () => {
  const property = useProperty()

  if (!property.agent || typeof property.agent === "string") return null
  const profilePhoto = property.agent.profilePhoto as Media

  const initials = property.agent.initials!

  const bgColor = initials
    ? backgroundColors[initials.charCodeAt(0) % backgroundColors.length]
    : backgroundColors[0]

  return (
    <div className="bg-white rounded-lg p-6 flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <Avatar className="size-12">
          <AvatarImage className="object-cover" src={profilePhoto.url ?? ""} />
          <AvatarFallback
            style={{
              backgroundColor: bgColor,
            }}
          >
            {property.agent.initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-4">
          <div>
            <h4 className="text-lg font-semibold">{property.agent.full_name}</h4>
            <p className="text-sm text-muted-foreground">{property.agent.title}</p>
            <p className="text-muted-foreground text-xs">
              License #{property.agent.licenses?.[0]?.license_number}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <PhoneCallIcon size={16} />
              <a href={`tel:${property.agent.phone}`}>{property.agent.phone}</a>
            </div>
            <div className="flex items-center gap-2">
              <MailIcon size={16} />
              <a href={`mailto:${property.agent.contact_email}`}>{property.agent.contact_email}</a>
            </div>
          </div>
        </div>
      </div>
      <form className="flex flex-1 w-full flex-col gap-2">
        <div className="flex flex-col gap-2"></div>
        <Input placeholder="Enter your name" />
        <Input placeholder="Enter your email" />
        <Input placeholder="Enter your phone" />
        <Textarea placeholder="Enter your message" />

        <Button type="submit" className="w-full">
          Send
        </Button>
      </form>
    </div>
  )
}
