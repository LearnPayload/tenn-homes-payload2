export const propertyTypeMap = {
  "single-family": { label: "Single Family" },
  "multi-family": { label: "Multi-Family" },
  condo: { label: "Condo" },
  townhouse: { label: "Townhouse" },
  land: { label: "Land" },
  "mobile-home": { label: "Mobile Home" },
  other: { label: "Other" },
}
export type PropertyType = keyof typeof propertyTypeMap
export type PropertyTypeOption = {
  label: string
  value: PropertyType
}

export const propertyTypeOptions: PropertyTypeOption[] = Object.entries(propertyTypeMap).map(
  ([value, item]) => ({
    label: item.label,
    value: value as PropertyType,
  }),
)
