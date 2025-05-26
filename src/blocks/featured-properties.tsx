import { FeaturedPropertyCard } from "@/components/property/featured-property-card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { PropertyProvider } from "@/components/property/context"
import { db } from "@/repositories"

export async function FeaturedProperties() {
  const properties = await db.properties.getMany({
    limit: 8,
    where: {
      listingStatus: {
        equals: "forsale",
      },
    },
  })
  return (
    <section className="py-16 bg-accent text-accent-foreground">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Featured Properties in East Tennessee</h2>
          </div>
        </div>

        <Carousel
          opts={{
            align: "start",
          }}
          className="flex-1 w-full"
        >
          <CarouselContent className="pb-1">
            {properties.map((property) => (
              <PropertyProvider property={property} key={property.original.id}>
                <CarouselItem
                  key={property.original.id}
                  className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 h-auto"
                >
                  <FeaturedPropertyCard />
                </CarouselItem>
              </PropertyProvider>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}
