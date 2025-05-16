export const propertyTypeMap = {
  'single-family': 'Single Family',
  'multi-family': 'Multi-Family',
  condo: 'Condo',
  townhouse: 'Townhouse',
  land: 'Land',
  'mobile-home': 'Mobile Home',
}
export type PropertyType = keyof typeof propertyTypeMap
export type PropertyTypeOption = {
  label: string
  value: PropertyType
}

export const propertyTypeOptions: PropertyTypeOption[] = Object.entries(propertyTypeMap).map(
  ([value, label]) => ({
    label,
    value: value as PropertyType,
  }),
)
