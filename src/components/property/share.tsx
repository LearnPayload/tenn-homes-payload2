import { Share2Icon } from 'lucide-react'

import { HeartPlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const PropertyShare = () => {
  return (
    <div className="flex gap-2">
      <Button variant="ghost" className="p-0 size-10">
        <Share2Icon size={24} className="shrink-0 h-6 w-6" />
      </Button>
      <Button variant="ghost" className="p-0 size-10">
        <HeartPlusIcon size={24} className="shrink-0 h-6 w-6" />
      </Button>
    </div>
  )
}
