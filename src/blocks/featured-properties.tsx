import { FeaturedPropertyCard } from '@/components/property/feartured-property-card'
import { Link } from '@payloadcms/ui'
import { db } from '@/repositories'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export async function FeaturedProperties() {
  const properties = await db.properties.getMany({
    limit: 8,
    where: {
      listingStatus: {
        equals: 'forsale',
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
            align: 'start',
          }}
          className="flex-1 w-full"
        >
          <CarouselContent className="pb-1">
            {properties.map((property) => (
              <CarouselItem
                key={property.id}
                className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 h-auto"
              >
                <FeaturedPropertyCard key={property.id} property={property} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}
