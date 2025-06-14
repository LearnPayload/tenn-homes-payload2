"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export const SearchHeader = () => {
  return (
    <div className="bg-white border-b h-20 flex items-center justify-center">
      <div className="flex items-center gap-4 w-full max-w-6xl px-4">
        <div className="flex-1 relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="City, Address, ZIP"
            className="pl-10 h-12 border-gray-300 md:text-base"
          />
        </div>

        <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
          <span>Price</span>
          <span>•</span>
          <span>Beds & Baths</span>
          <span>•</span>
          <span>More</span>
        </div>
      </div>
    </div>
  )
}
