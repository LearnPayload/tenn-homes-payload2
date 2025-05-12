import { Footer } from '@/app/(frontend)/_layouts/footer'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { HeartPlusIcon, MailIcon, PhoneCallIcon, Share2Icon } from 'lucide-react'

export default function PropertyGallery() {
  // Sample property images
  const images = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=5340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Property image 1',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1519678767534-29483894b34d?q=80&w=5340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Property image 2',
    },
    {
      id: 3,
      url: 'https://plus.unsplash.com/premium_photo-1675537856917-d662fd1ddc3a?q=80&w=5187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Property image 3',
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=2784&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Property image 4',
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Property image 5',
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1499814375754-a481db8ab6c5?q=80&w=4000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Property image 6',
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=80&w=5340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Property image 7',
    },
  ]

  const tags = [
    {
      id: 1,
      name: 'For Sale',
      color: 'oklch(37.3% 0.034 259.733)',
    },
    {
      id: 2,
      name: 'Featured',
      color: 'oklch(60% 0.118 184.704)',
    },
  ]

  // Feature image is the first one
  const featureImage = images[0]
  // Grid images are all remaining images (index 1 and beyond)
  const gridImages = images.slice(1)

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="relative">
        {/* Main gallery with CSS Grid that changes based on screen size */}
        <div className="grid grid-cols-12 grid-rows-1 gap-1  max-h-[520px]">
          {/* Feature image - always visible */}
          <img
            src={featureImage.url}
            alt={featureImage.alt}
            className="w-full col-span-12 h-full tablet:col-span-8 desktop:col-span-6 object-cover cursor-pointer"
          />

          {/* Secondary images - visible based on screen size */}
          <div className="hidden h-full grid-cols-1 tablet:grid tablet:grid-cols-1 desktop:grid-cols-2 large:grid-cols-3 tablet:grid-rows-2 tablet:col-span-4 desktop:col-span-6 gap-1">
            {gridImages.map((image, index) => {
              // Determine visibility based on screen size and image position
              let visibilityClass = ''

              if (index < 2) {
                // First two images visible on tablet and up
                visibilityClass = ''
              } else if (index < 4) {
                // Next two images visible on desktop and up
                visibilityClass = 'hidden desktop:block'
              } else {
                // Last two images visible only on large screens
                visibilityClass = 'hidden large:block'
              }

              return (
                <img
                  key={image.id}
                  src={image.url}
                  alt={image.alt}
                  className={`w-full h-full object-cover cursor-pointer photo-${image.id} ${visibilityClass}`}
                />
              )
            })}
          </div>
        </div>
      </div>
      <div className="max-w-7xl px-4 large:p-0 w-full mx-auto grid grid-cols-12 gap-4">
        <div className="col-span-12 desktop:col-span-8 grid gap-4">
          {/* Property Details */}
          <div className="bg-white rounded-lg p-6 flex items-start justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold">Beautiful Home in the Smoky Mountains!</h1>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <div
                      key={tag.id}
                      className={`text-sm font-medium uppercase text-white px-3 py-1 rounded-xs`}
                      style={{ backgroundColor: tag.color }}
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-semibold">5325 Roberts Rd</span>, Corryton, TN 37721
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                <div>
                  <h3 className="text-3xl font-bold leading-none">$670,000</h3>
                  <p>
                    <span className="font-thin leading-none">Est. $5,072/mo</span>
                  </p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold leading-none">3</h3>
                  <p>
                    <span className="font-thin leading-none">Beds</span>
                  </p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold leading-none">2</h3>
                  <p>
                    <span className="font-thin leading-none">Baths</span>
                  </p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold leading-none">1,800</h3>
                  <p>
                    <span className="font-thin leading-none">Sqft</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Button variant="ghost" className="p-0 size-10">
                  <Share2Icon size={24} className="shrink-0 h-6 w-6" />
                </Button>
                <Button variant="ghost" className="p-0 size-10">
                  <HeartPlusIcon size={24} className="shrink-0 h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
          {/* Overview */}
          <div className="bg-white rounded-lg p-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-semibold leading-none mb-4">Overview</h2>
                <div className="flex flex-wrap gap-2 text-lg leading-relaxed">
                  Beautiful ranch-style home in Corryton. This property features 4 bedrooms, 2
                  bathrooms, and 2,154 square feet of living space on a spacious lot. Recently
                  updated with modern amenities while maintaining its classic charm. The open floor
                  plan creates a welcoming atmosphere perfect for both everyday living and
                  entertaining.
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-medium leading-none mb-4">Property Details</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-base font-medium">Type</h4>
                    <p className="text-base">Single Family</p>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-base font-medium">Year Built</h4>
                    <p className="text-base">2020</p>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-base font-medium">Lot Size</h4>
                    <p className="text-base">1.5 acres</p>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-base font-medium">Heating</h4>
                    <p className="text-base">Forced Air</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Features */}
          <div className="bg-white rounded-lg p-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-semibold leading-none mb-4">Features</h2>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <h4 className="text-base font-semibold mb-3">Interior Features</h4>
                  <ul className="list-disc list-inside flex flex-col gap-2">
                    <li>
                      <span>CentralAir Conditioning</span>
                    </li>
                    <li>
                      <span>Hardwood Floors</span>
                    </li>
                    <li>
                      <span>Attached Garage</span>
                    </li>
                    <li>
                      <span>Updated Kitchen</span>
                    </li>
                    <li>
                      <span>Open Floor Plan</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-base font-semibold mb-3">Exterior Features</h4>
                  <ul className="list-disc list-inside flex flex-col gap-2">
                    <li>
                      <span>Paved Driveway</span>
                    </li>
                    <li>
                      <span>Private Backyard</span>
                    </li>
                    <li>
                      <span>Fenced Yard</span>
                    </li>
                    <li>
                      <span>Outdoor Seating</span>
                    </li>
                    <li>
                      <span>Covered Porch</span>
                    </li>
                    <li>
                      <span>Outdoor Lighting</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-lg p-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-semibold leading-none mb-4">Map</h2>
                <div className="h-96 w-full bg-zinc-100 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Details */}
        <div className="col-span-12 desktop:col-span-4">
          <div className="sticky top-4">
            <div className="bg-white rounded-lg p-6 flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <Avatar className="size-12">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-4">
                  <div>
                    <h4 className="text-lg font-semibold">Sarah Johnson</h4>
                    <p className="text-sm text-muted-foreground">
                      Licensed Real Estate Agent in Tennessee
                    </p>
                    <p className="text-muted-foreground text-xs">License #123456</p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <PhoneCallIcon size={16} />
                      <a href="tel:+1234567890">123-456-7890</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <MailIcon size={16} />
                      <a href="mailto:sarah@example.com">sarah@example.com</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Input placeholder="Enter your name" />
                <Input placeholder="Enter your email" />
                <Textarea placeholder="Enter your message" />

                <Button className="w-full" size={'lg'}>
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
