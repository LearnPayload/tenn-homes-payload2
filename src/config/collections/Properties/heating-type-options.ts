export const heatingTypeMap = {
  central: 'Central',
  electric: 'Electric',
  gas: 'Gas',
  oil: 'Oil',
  propane: 'Propane',
}

export type HeatingType = keyof typeof heatingTypeMap
export type HeatingTypeOption = {
  label: string
  value: HeatingType
}

export const heatingTypeOptions: HeatingTypeOption[] = Object.entries(heatingTypeMap).map(
  ([value, label]) => ({
    label,
    value: value as HeatingType,
  }),
)
