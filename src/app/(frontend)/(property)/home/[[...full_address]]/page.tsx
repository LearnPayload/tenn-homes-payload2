import { PropertyGallery } from '@/components/property/gallery'
import { headers } from 'next/headers'
import type { Property as PropertyType } from '@/payload-types'
import { notFound } from 'next/navigation'
import { PropertyProvider } from '@/components/property/context'
import { PropertyDetail } from '@/components/property/detail'
import { PropertyOverview } from '@/components/property/overview'
import { PropertyFeatures } from '@/components/property/features'
import { PropertyMap } from '@/components/property/map'
import { PropertyAgentContact } from '@/components/property/agent-contact'
async function fetchProperty(id: string) {
  const res = await fetch(`http://localhost:3000/api/properties/${id}`, {
    headers: await headers(),
  })
  if (!res.ok) return undefined
  return res.json()
}
export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ full_address: string[] }>
}) {
  const { full_address } = await params
  const id = full_address[full_address.length - 1]
  const data = (await fetchProperty(id)) as PropertyType

  if (!data) {
    return notFound()
  }

  return (
    <PropertyProvider data={data}>
      <div className="w-full flex flex-col gap-4">
        <div className="relative">
          {/* Main gallery with CSS Grid that changes based on screen size */}
          <PropertyGallery />
        </div>
        <div className="max-w-7xl px-4 large:p-0 w-full mx-auto grid grid-cols-12 gap-4">
          <div className="col-span-12 desktop:col-span-8 grid gap-4">
            <PropertyDetail />
            <PropertyOverview />
            <PropertyFeatures />
            <PropertyMap />
          </div>

          {/* Agent Details */}
          <div className="col-span-12 desktop:col-span-4">
            <PropertyAgentContact />
          </div>
        </div>
      </div>
    </PropertyProvider>
  )
}
