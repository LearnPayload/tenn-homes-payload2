import { AgentContact } from '@/components/property/agent-contact'
import { PropertyProvider } from '@/components/property/context'
import { PropertyDetails } from '@/components/property/details'
import { PropertyFeatures } from '@/components/property/features'
import { PropertyGallery } from '@/components/property/gallery'
import { PropertyMap } from '@/components/property/map'
import { PropertyOverview } from '@/components/property/overview'
import { repository } from '@/repositories'

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ routePath: string[] }>
}) {
  const { routePath } = await params
  const propertyId = routePath[routePath.length - 1]
  const property = await repository.getProperty(propertyId)

  return (
    <PropertyProvider property={property}>
      <div className="w-full flex flex-col">
        <PropertyGallery />
        <div className="max-w-7xl p-4  w-full mx-auto grid grid-cols-12 gap-4">
          <div className="col-span-12 desktop:col-span-8 grid gap-4">
            <PropertyDetails />
            <PropertyOverview />
            <PropertyFeatures />
            <PropertyMap />
          </div>

          <div className="col-span-12 desktop:col-span-4">
            <div className="sticky top-4">
              <AgentContact />
            </div>
          </div>
        </div>
      </div>
    </PropertyProvider>
  )
}
