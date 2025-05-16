const specializationsMap = {
  residential: 'Residential',
  commercial: 'Commercial',
  luxury: 'Luxury',
  first_time: 'First-Time Buyers',
  investment: 'Investment',
  vacation: 'Vacation Homes',
  relocation: 'Relocation',
} as const

type Specialization = keyof typeof specializationsMap

export const specializations = Object.entries(specializationsMap).map(([value, label]) => ({
  label,
  value: value as Specialization,
}))
