import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'
import Hero from '@/app/(frontend)/(home)/_components/hero'
import singleFamilyHomeKnoxville from '@/assets/knoxville-single-family.png'
import villaHomeKnoxville from '@/assets/villa.png'
import momAvatar from '@/assets/mom-avatar.png'
import attorneyAvatar from '@/assets/attorney.png'
import ruralMomAvatar from '@/assets/rural-mom.png'
import landPlot from '@/assets/land.png'
import apartment from '@/assets/apartment.png'
import office from '@/assets/office.png'
import condo from '@/assets/condo.png'
import { Input } from '@/components/ui/input'
import { FixedHeader } from '../_layouts/fixed-header'
import { Footer } from '../_layouts/footer'
import Link from 'next/link'
import { FeaturedProperties } from '@/blocks/featured-properties'
const company_name = 'Tenn Homes'

export default async function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <FixedHeader />

      <main className="flex-1">
        <Hero />

        {/* About Section */}
        <section className="py-16 bg-background text-foreground">
          <div className="container mx-auto px-4">
            <div className="flex flex-col tablet:flex-row gap-12">
              <div className="tablet:w-1/2">
                <h2 className="text-3xl font-bold mb-6">
                  Your Trusted Partner in East Tennessee Real Estate
                </h2>
                <p className="text-muted-foreground mb-6">
                  With deep roots in East Tennessee, we understand what makes this region special.
                  From the Great Smoky Mountains to the Tennessee River, we help you find the
                  perfect property that captures the essence of mountain living.
                </p>
                <p className="text-muted-foreground mb-6">
                  Our team of local experts knows every corner of East Tennessee, from Knoxville's
                  vibrant downtown to the peaceful mountain communities. We'll guide you through
                  every step of finding your dream home in this beautiful region.
                </p>
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-md px-6 py-2.5">
                  MEET OUR TEAM
                </Button>
              </div>

              <div className="tablet:w-1/2 grid grid-cols-1 desktop:grid-cols-2 large:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-6 rounded-md">
                  <div className="text-3xl font-bold text-primary mb-2">25+</div>
                  <p className="text-sm text-muted-foreground">
                    Years of experience in the local real estate market helping clients find their
                    dream homes
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-md">
                  <div className="text-3xl font-bold text-primary mb-2">1.5k</div>
                  <p className="text-sm text-muted-foreground">
                    Happy clients whose dream homes we've helped them find and purchase
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-md">
                  <div className="text-3xl font-bold text-primary mb-2">18+</div>
                  <p className="text-sm text-muted-foreground">
                    Professional agents with exceptional local knowledge ensuring quality service
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FeaturedProperties />

        {/* Property Types */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">
              Explore East Tennessee's Diverse Property Types
            </h2>

            <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-6">
              {/* Type 1 */}
              <div className="group relative overflow-hidden rounded-lg">
                <Image
                  src={apartment}
                  alt="Apartment"
                  width={500}
                  height={300}
                  className="object-cover h-64 w-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-1">APARTMENT</h3>
                  <p className="text-white/80 text-sm">10 PROPERTIES</p>
                </div>
              </div>

              {/* Type 2 */}
              <div className="group relative overflow-hidden rounded-lg">
                <Image
                  src={singleFamilyHomeKnoxville}
                  alt="Single Family Home"
                  width={500}
                  height={300}
                  className="object-cover h-64 w-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-1">SINGLE FAMILY HOME</h3>
                  <p className="text-white/80 text-sm">24 PROPERTIES</p>
                </div>
              </div>

              {/* Type 3 */}
              <div className="group relative overflow-hidden rounded-lg">
                <Image
                  src={villaHomeKnoxville}
                  alt="Villa"
                  width={500}
                  height={300}
                  className="object-cover h-64 w-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-1">VILLA</h3>
                  <p className="text-white/80 text-sm">8 PROPERTIES</p>
                </div>
              </div>

              {/* Type 4 */}
              <div className="group relative overflow-hidden rounded-lg">
                <Image
                  src={condo}
                  alt="Condo"
                  width={500}
                  height={300}
                  className="object-cover h-64 w-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-1">CONDO</h3>
                  <p className="text-white/80 text-sm">12 PROPERTIES</p>
                </div>
              </div>

              {/* Type 5 */}
              <div className="group relative overflow-hidden rounded-lg">
                <Image
                  src={landPlot}
                  alt="Land"
                  width={500}
                  height={300}
                  className="object-cover h-64 w-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-1">LAND</h3>
                  <p className="text-white/80 text-sm">6 PROPERTIES</p>
                </div>
              </div>

              {/* Type 6 */}
              <div className="group relative overflow-hidden rounded-lg">
                <Image
                  src={office}
                  alt="Office"
                  width={500}
                  height={300}
                  className="object-cover h-64 w-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-1">OFFICE</h3>
                  <p className="text-white/80 text-sm">5 PROPERTIES</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-accent text-accent-foreground">
          <div className="container mx-auto px-4">
            <div className="flex flex-col tablet:flex-row bg-background rounded-lg overflow-hidden shadow-lg">
              <div className="tablet:w-1/2 p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Find Your East Tennessee Dream Home?
                </h2>
                <p className="text-muted-foreground mb-8">
                  Contact us now for a free consultation with one of our expert East Tennessee
                  agents. We'll help you find the perfect property that meets all your requirements,
                  whether you're looking for a mountain retreat or a downtown condo.
                </p>
                <Button className="bg-primary hover:bg-primary/90 text-white w-fit">
                  CONTACT US
                </Button>
              </div>
              <div className="tablet:w-1/2 relative min-h-[300px]">
                <Image
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Professional real estate agent in modern office"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-background text-foreground">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12">Testimonials</h2>

            <div className="grid grid-cols-1 tablet:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-accent p-8 rounded-lg">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "Working with TennHomes was an absolute pleasure. They understood exactly what we
                  were looking for in the Smoky Mountains and made the entire process smooth. They
                  found our dream home with the perfect mountain view!"
                </p>
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-accent">
                    <Image
                      src={momAvatar}
                      alt="Client"
                      width={48}
                      height={48}
                      className="object-cover size-12"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Sarah Johnson</h4>
                    <p className="text-sm text-muted-foreground">Knoxville, TN</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-accent p-8 rounded-lg">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "I was impressed by the professionalism and local knowledge of the team at{' '}
                  {company_name}. They sold our home in Knoxville quickly and at the best price.
                  Their understanding of the East Tennessee market is unmatched!"
                </p>
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-accent">
                    <Image src={attorneyAvatar} alt="Client" width={48} height={48} />
                  </div>
                  <div>
                    <h4 className="font-medium">James Smith</h4>
                    <p className="text-sm text-muted-foreground">Gatlinburg, TN</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-accent p-8 rounded-lg">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "As a first-time homebuyer in Johnson City, I was nervous. But they made the
                  process so easy. They were always there to answer my questions about the area and
                  helped me find the perfect starter home in a great neighborhood."
                </p>
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-accent">
                    <Image src={ruralMomAvatar} alt="Client" width={48} height={48} />
                  </div>
                  <div>
                    <h4 className="font-medium">Emily Rodriguez</h4>
                    <p className="text-sm text-muted-foreground">Johnson City, TN</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-16 bg-accent text-accent-foreground">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12">
              East Tennessee Real Estate Tips, Trends, And Updates
            </h2>

            <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 gap-6">
              {/* Blog Post 1 */}
              <Card className="overflow-hidden border-0 shadow-sm gap-0 py-0 hover:shadow-md transition-shadow">
                <div className="relative">
                  <Image
                    src="https://images.unsplash.com/photo-1596134474939-f248eb9ed3fe?q=80&w=3786&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Downtown Knoxville Market Square"
                    width={500}
                    height={300}
                    className="object-cover h-56 w-full"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2">
                    Guide to Downtown Knoxville: Market Square and Beyond
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    Discover the charm of Market Square, local eateries, and the vibrant culture
                    that makes downtown Knoxville a perfect place to call home.
                  </p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>April 6, 2025</span>
                    <Button variant="link" className="text-primary p-0 h-auto font-medium">
                      Continue Reading
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Blog Post 2 */}
              <Card className="overflow-hidden border-0 gap-0 shadow-sm hover:shadow-md py-0 transition-shadow">
                <div className="relative">
                  <Image
                    src="https://images.unsplash.com/photo-1625663033411-61031d9ac19e?q=80&w=4287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Gatlinburg Scenic View"
                    width={500}
                    height={300}
                    className="object-cover h-56 w-full"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2">
                    Living in Gatlinburg: A Local's Perspective
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    Experience the magic of living in the Gateway to the Smokies - from year-round
                    tourism to peaceful mountain living.
                  </p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>March 28, 2025</span>
                    <Button variant="link" className="text-primary p-0 h-auto font-medium">
                      Continue Reading
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Blog Post 3 */}
              <Card className="overflow-hidden border-0 gap-0 shadow-sm hover:shadow-md py-0 transition-shadow">
                <div className="relative">
                  <Image
                    src="https://images.unsplash.com/photo-1657312145619-8fdad5e7b663?q=80&w=4315&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Johnson City Downtown"
                    width={500}
                    height={300}
                    className="object-cover h-56 w-full"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2">Johnson City's Growing Communities</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    Explore the newest developments and family-friendly neighborhoods in Johnson
                    City's thriving community.
                  </p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>March 15, 2025</span>
                    <Button variant="link" className="text-primary p-0 h-auto font-medium">
                      Continue Reading
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Blog Post 4 */}
              <Card className="overflow-hidden border-0 gap-0 shadow-sm hover:shadow-md py-0 transition-shadow">
                <div className="relative">
                  <Image
                    src="https://images.unsplash.com/photo-1509838174235-432f709c7bfd?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Fall colors in the Smokies"
                    width={500}
                    height={300}
                    className="object-cover h-56 w-full"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2">Best Neighborhoods for Mountain Views</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    Find your perfect mountain vista - top communities in Sevier County with
                    spectacular Smoky Mountain views.
                  </p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>March 5, 2025</span>
                    <Button variant="link" className="text-primary p-0 h-auto font-medium">
                      Continue Reading
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Stay Updated With East Tennessee Real Estate
            </h2>
            <p className="max-w-2xl mx-auto mb-8">
              Sign up for our newsletter and be the first to know about new properties, market
              trends, and expert advice about living in East Tennessee. No spam, just valuable
              content about our beautiful region.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background text-foreground border-0 h-12 tablet:text-base"
              />
              <Button variant="outline" size="lg" className="h-12 tablet:text-base">
                SIGN UP
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
