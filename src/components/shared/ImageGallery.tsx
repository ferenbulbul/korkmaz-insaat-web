'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ProjectImage } from '@/types/project'

interface ImageGalleryProps {
  images: ProjectImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const isOpen = selectedIndex !== null

  const handlePrev = () => {
    if (selectedIndex === null) return
    setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1)
  }

  const handleNext = () => {
    if (selectedIndex === null) return
    setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrev()
    if (e.key === 'ArrowRight') handleNext()
  }

  if (images.length === 0) return null

  return (
    <>
      {/* Thumbnail grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedIndex(index)}
            className={cn(
              'group relative overflow-hidden rounded-xl bg-muted',
              'cursor-pointer transition-all duration-300 hover:shadow-lg',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
              // First image spans 2 cols on desktop for visual emphasis
              index === 0 && images.length > 2
                ? 'aspect-[16/10] md:col-span-2 md:row-span-2'
                : 'aspect-video',
            )}
            aria-label={image.alt || `Gorsel ${index + 1}`}
          >
            <Image
              src={image.url}
              alt={image.alt || `Gorsel ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes={
                index === 0 && images.length > 2
                  ? '(max-width: 768px) 100vw, 66vw'
                  : '(max-width: 768px) 50vw, 33vw'
              }
            />
            {/* Subtle hover overlay */}
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
          </button>
        ))}
      </div>

      {/* Lightbox dialog */}
      <Dialog
        open={isOpen}
        onOpenChange={(open) => !open && setSelectedIndex(null)}
      >
        <DialogContent
          className="max-w-4xl border-none bg-black/95 p-0 sm:max-w-4xl"
          onKeyDown={handleKeyDown}
        >
          <DialogTitle className="sr-only">
            {selectedIndex !== null
              ? images[selectedIndex]?.alt || `Gorsel ${selectedIndex + 1}`
              : 'Gorsel'}
          </DialogTitle>

          {/* Image display */}
          <div className="relative aspect-video">
            {selectedIndex !== null && (
              <Image
                src={images[selectedIndex].url}
                alt={images[selectedIndex].alt || `Gorsel ${selectedIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 896px"
                priority
              />
            )}

            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-white"
                  aria-label="Onceki gorsel"
                >
                  <ChevronLeft className="size-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-white"
                  aria-label="Sonraki gorsel"
                >
                  <ChevronRight className="size-6" />
                </Button>
              </>
            )}
          </div>

          {/* Image counter */}
          {selectedIndex !== null && (
            <div className="pb-4 text-center text-sm text-white/60">
              {selectedIndex + 1} / {images.length}
              {images[selectedIndex]?.alt && (
                <span className="ml-2 text-white/40">
                  &mdash; {images[selectedIndex].alt}
                </span>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ImageGallery
