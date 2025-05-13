'use client'

import { useProperty } from './context'

export const PropertyAddress = () => {
  const property = useProperty()
  return <div>{property.formattedAddress}</div>
}
