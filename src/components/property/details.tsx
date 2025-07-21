"use client"

import { PropertyAddress } from "./address"
import { useProperty } from "../providers/property"
import { PropertyStatus } from "./status"
import { PropertyShare } from "./share"
export const PropertyDetails = () => {
  const property = useProperty()
  return (
    <div className="bg-white rounded-lg p-6 flex items-start justify-between">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">{property.title}</h1>
          <div className="flex flex-wrap gap-2">
            <PropertyStatus listingStatus={property.listingStatus} />
          </div>
        </div>
        <div>
          <PropertyAddress />
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          <div>
            <h3 className="text-3xl font-bold leading-none">{property.price}</h3>
            <p>
              <span className="font-thin leading-none">Est. $5,072/mo</span>
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-bold leading-none">{property.details?.bedrooms}</h3>
            <p>
              <span className="font-thin leading-none">Beds</span>
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-bold leading-none">{property.details?.bathrooms}</h3>
            <p>
              <span className="font-thin leading-none">Baths</span>
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-bold leading-none">{property.details?.squareFeet}</h3>
            <p>
              <span className="font-thin leading-none">Sqft</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <PropertyShare />
      </div>
    </div>
  )
}
