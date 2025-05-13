import { HeartPlusIcon } from 'lucide-react'

import { Share2Icon } from 'lucide-react'
import { Button } from '../ui/button'
import { PropertyAddress } from './address'
import { PropertyTitle } from './title'
const tags = [
  {
    id: 1,
    name: 'For Sale',
    color: 'oklch(37.3% 0.034 259.733)',
  },
  {
    id: 2,
    name: 'Featured',
    color: 'oklch(60% 0.118 184.704)',
  },
]

export const PropertyDetail = () => {
  return (
    <div className="bg-white rounded-lg p-6 flex items-start justify-between">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <PropertyTitle />
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div
                key={tag.id}
                className={`text-sm font-medium uppercase text-white px-3 py-1 rounded-xs`}
                style={{ backgroundColor: tag.color }}
              >
                {tag.name}
              </div>
            ))}
          </div>
        </div>
        <PropertyAddress />
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          <div>
            <h3 className="text-3xl font-bold leading-none">$670,000</h3>
            <p>
              <span className="font-thin leading-none">Est. $5,072/mo</span>
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-bold leading-none">3</h3>
            <p>
              <span className="font-thin leading-none">Beds</span>
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-bold leading-none">2</h3>
            <p>
              <span className="font-thin leading-none">Baths</span>
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-bold leading-none">1,800</h3>
            <p>
              <span className="font-thin leading-none">Sqft</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Button variant="ghost" className="p-0 size-10">
            <Share2Icon size={24} className="shrink-0 h-6 w-6" />
          </Button>
          <Button variant="ghost" className="p-0 size-10">
            <HeartPlusIcon size={24} className="shrink-0 h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
