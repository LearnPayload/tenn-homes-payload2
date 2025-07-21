import { PropertyInquiry } from "@/components/property/property-inquiry"
import { PropertyProvider } from "@/components/providers/property"
import { PropertyDetails } from "@/components/property/details"
import { PropertyFeatures } from "@/components/property/features"
import { PropertyGallery } from "@/components/property/gallery"
import { PropertyMap } from "@/components/property/map"
import { PropertyOverview } from "@/components/property/overview"
import { redirect } from "next/navigation"
import { SERVER_URL } from "@/config/env"
import { local } from "@/repository"

export async function generateMetadata({ params }: { params: Promise<{ routePath: string[] }> }) {
  const { routePath } = await params
  const propertyId = routePath[routePath.length - 1]
  const property = await local.property.getByID(propertyId)
  if (!property) {
    return {
      title: "Property Not Found",
      description: "The requested property could not be found.",
    }
  }

  return {
    metadataBase: new URL(SERVER_URL || "http://localhost:3000"),
    alternates: {
      canonical: property.url,
    },
    title: `${property.address.full_address} | Tenn Homes`,
    description: property.description,
  }
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ routePath: string[] }>
}) {
  const { routePath } = await params
  const propertyId = routePath[routePath.length - 1]
  const property = await local.property.getByID(propertyId)

  // ensure canonical URL is correct
  const path = `/home/${routePath.join("/")}`

  if (path !== property.url) {
    // If the path does not match the stored URL, redirect to the correct URL
    redirect(property.url)
  }

  return (
    <PropertyProvider property={property.original}>
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
              <PropertyInquiry />
            </div>
          </div>
        </div>
      </div>
    </PropertyProvider>
  )
}
