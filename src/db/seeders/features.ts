import { Payload } from 'payload'

type FeatureCategory = 'interior' | 'exterior' | 'community' | 'other'

interface Feature {
  name: string
  category: FeatureCategory
  description: string
  icon: string
}

const features: Feature[] = [
  {
    name: 'Hardwood Floors',
    category: 'interior',
    description: 'Original hardwood flooring throughout the home',
    icon: 'floor',
  },
  {
    name: 'Granite Countertops',
    category: 'interior',
    description: 'Premium granite countertops in kitchen and bathrooms',
    icon: 'counter',
  },
  {
    name: 'Stainless Steel Appliances',
    category: 'interior',
    description: 'Modern stainless steel kitchen appliances',
    icon: 'appliance',
  },
  {
    name: 'Swimming Pool',
    category: 'exterior',
    description: 'Private swimming pool in the backyard',
    icon: 'pool',
  },
  {
    name: 'Garage',
    category: 'exterior',
    description: 'Attached garage with automatic door',
    icon: 'garage',
  },
  {
    name: 'Fenced Yard',
    category: 'exterior',
    description: 'Fully fenced backyard for privacy and security',
    icon: 'fence',
  },
  {
    name: 'Gated Community',
    category: 'community',
    description: 'Located in a secure gated community',
    icon: 'gate',
  },
  {
    name: 'Fitness Center',
    category: 'community',
    description: 'Access to community fitness center',
    icon: 'fitness',
  },
  {
    name: 'Security System',
    category: 'other',
    description: 'Modern security system with cameras and alarms',
    icon: 'security',
  },
  {
    name: 'Solar Panels',
    category: 'other',
    description: 'Energy-efficient solar panel system',
    icon: 'solar',
  },
]

export async function seedFeatures(payload: Payload) {
  console.log('Seeding features...')

  for (const feature of features) {
    await payload.create({
      collection: 'features',
      data: feature,
    })
  }

  console.log('Features seeding completed')
}
