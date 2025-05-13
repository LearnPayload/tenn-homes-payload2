'use client'

import { useProperty } from './context'

export const PropertyTitle = () => {
  const property = useProperty()
  return <div>{property.title}</div>
}
