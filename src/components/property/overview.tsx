'use client'

import { useProperty } from './context'

export const PropertyOverview = () => {
  const property = useProperty()
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold leading-none mb-4">Overview</h2>
          <div className="flex flex-wrap gap-2 text-lg leading-relaxed">
            {property.data.description}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-medium leading-none mb-4">Property Details</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <h4 className="text-base font-medium">Type</h4>
              <p className="text-base">Single Family</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-base font-medium">Year Built</h4>
              <p className="text-base">2020</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-base font-medium">Lot Size</h4>
              <p className="text-base">1.5 acres</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-base font-medium">Heating</h4>
              <p className="text-base">Forced Air</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
