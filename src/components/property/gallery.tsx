'use client'

import { useProperty } from './context'

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

export const PropertyGallery = () => {
  const property = useProperty()

  console.log(property.photos)
  const images = property.photos

  // Feature image is the first one
  const featureImage = images[0]
  // Grid images are all remaining images (index 1 and beyond)
  const gridImages = images.slice(1, 7)
  return (
    <div className="relative">
      {/* Main gallery with CSS Grid that changes based on screen size */}
      <div className="grid grid-cols-12 grid-rows-1 gap-1  max-h-[520px] 2xl:max-h-[680px]">
        {/* Feature image - always visible */}
        {featureImage?.url && (
          <img
            key={featureImage.url}
            src={featureImage.url}
            alt={featureImage.alt}
            className="w-full col-span-12 h-full tablet:col-span-8 desktop:col-span-6 object-cover cursor-pointer"
          />
        )}

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

            if (!image.url) return null

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
  )
}
