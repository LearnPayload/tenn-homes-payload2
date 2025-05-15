'use client'

import { Media } from '@/payload-types'
import { useProperty } from './context'
import photoPlaceholder from '@/assets/photo-placeholder.png'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DecoratedPhoto } from '@/repositories/property-decorator'

export const PropertyGallery = () => {
  const property = useProperty()
  const photos = (property?.photos as Media[]) ?? []

  const images: DecoratedPhoto[] = Array(7)
    .fill(null)
    .map((_, index) => {
      if (!photos[index])
        return {
          id: `missing-${index + 1}`,
          url: null,
          alt: 'Missing Image',
        }
      return {
        id: photos[index].id.toString(),
        url: photos[index].url!,
        alt: photos[index].alt,
      }
    })

  // Feature image is the first one
  const featureImage = images[0]

  // Grid images are all remaining images (index 1 and beyond)
  const gridImages = images.slice(1, 7)

  return (
    <Dialog>
      <DialogTitle className="sr-only">{property?.title}</DialogTitle>
      <DialogDescription className="sr-only">{property?.description}</DialogDescription>
      <div className="relative">
        {/* Main gallery with CSS Grid that changes based on screen size */}
        <div className="grid grid-cols-12 grid-rows-1 gap-1  max-h-[520px] 2xl:max-h-[680px]">
          {/* Feature image - always visible */}
          {featureImage?.url && (
            <DialogTrigger key={featureImage.url} asChild>
              <img
                src={featureImage.url}
                alt={featureImage.alt}
                className="w-full col-span-12 h-full tablet:col-span-8 desktop:col-span-6 object-cover cursor-pointer"
              />
            </DialogTrigger>
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

              if (!image.url) {
                return (
                  <img
                    key={`${image.id}-${index}`}
                    src={photoPlaceholder.src}
                    alt={'No image available'}
                    width={50}
                    height={500}
                    className={`w-full h-full object-cover photo-${image.id} ${visibilityClass}`}
                  />
                )
              }

              return (
                <DialogTrigger key={image.id} asChild>
                  <img
                    src={image.url ?? ''}
                    alt={image.alt ?? ''}
                    width={50}
                    height={500}
                    className={`w-full h-full object-cover cursor-pointer photo-${image.id} ${visibilityClass}`}
                  />
                </DialogTrigger>
              )
            })}
          </div>
        </div>
      </div>
      <DialogContent className="h-screen w-full overflow-hidden max-w-full sm:max-w-full bg-transparent border-none shadow-none rounded-none">
        <div className="absolute inset-0 h-full w-full sm:p-6">
          <div className="bg-background sm:rounded-lg h-full w-full overflow-y-scroll p-4">
            <div className="mx-auto max-w-7xl">
              {images
                .filter((p) => !!p.url)
                .map((image, index) => {
                  return (
                    <img
                      key={`${image.id}-${index}`}
                      src={image.url ?? ''}
                      alt={image.alt ?? ''}
                      className="w-full h-full object-cover"
                    />
                  )
                })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
