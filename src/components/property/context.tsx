'use client'

import { Property } from '@/models/property'
import { Property as PropertyType } from '@/payload-types'
import { createContext, useContext } from 'react'

export const PropertyContext = createContext<PropertyType | null>(null)

export const PropertyProvider = ({
  children,
  data,
}: {
  children: React.ReactNode
  data: PropertyType
}) => {
  return <PropertyContext.Provider value={data}>{children}</PropertyContext.Provider>
}

export const useProperty = () => {
  const context = useContext(PropertyContext)
  if (!context) throw new Error('useProperty must be used within a PropertyProvider')
  const property = new Property(context)

  return property
}
