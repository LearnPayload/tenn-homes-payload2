'use client'
import { DecoratedProperty } from '@/repositories/property-decorator'
import { createContext, useContext } from 'react'

export const PropertyContext = createContext<DecoratedProperty | null>(null)

export const PropertyProvider = ({
  children,
  property,
}: {
  children: React.ReactNode
  property: DecoratedProperty
}) => {
  return <PropertyContext.Provider value={property}>{children}</PropertyContext.Provider>
}

export const useProperty = () => {
  const context = useContext(PropertyContext)
  if (!context) throw new Error('useProperty must be used within a PropertyProvider')

  return context
}
