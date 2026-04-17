'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import { cn } from '@/lib/utils'
import { Container } from '@/components/layout'
import { ScrollReveal } from '@/components/motion'

const HERO_IMAGES = [
  { url: '/images/hero/hero-1.jpg', alt: 'İnşaat sahası genel görünüm' },
  { url: '/images/hero/hero-2.jpg', alt: 'Modern konut projesi' },
  { url: '/images/hero/hero-3.jpg', alt: 'Ticari yapı projesi' },
  { url: '/images/hero/hero-4.jpg', alt: 'Lüks konut dış cephe' },
  { url: '/images/hero/hero-5.jpg', alt: 'Modern iç mekan tasarımı' },
]

const HeroSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [
      Autoplay({ delay: 5000, stopOnInteraction: false }),
      Fade(),
    ]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi, onSelect])

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  )

  const activeLabel = String(selectedIndex + 1).padStart(2, '0')
  const totalLabel = String(HERO_IMAGES.length).padStart(2, '0')

  return (
    <section className="noise-overlay relative -mt-20 flex min-h-screen items-center overflow-hidden">
      {/* Background carousel */}
      <div ref={emblaRef} className="absolute inset-0 overflow-hidden">
        <div className="flex h-full">
          {HERO_IMAGES.map((img, index) => (
            <div
              key={index}
              className="relative min-w-0 shrink-0 grow-0 basis-full"
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dark overlay — deep charcoal with asymmetric gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0C0A09]/95 via-[#0C0A09]/75 to-[#0C0A09]/40" />

      {/* Bottom gradient for smooth section transition */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-full bg-gradient-to-t from-[#FAFAF9] via-[#FAFAF9]/50 to-transparent" />

      {/* Diagonal gold line pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, transparent, transparent 80px, #B8962E 80px, #B8962E 81px)',
        }}
      />

      {/* Vertical gold accent line */}
      <div className="pointer-events-none absolute bottom-0 left-12 top-0 hidden w-px bg-gradient-to-b from-transparent via-gold-500/20 to-transparent lg:block" />

      {/* Tick corner frames — architectural */}
      <div className="pointer-events-none absolute left-8 top-28 hidden size-10 lg:block">
        <span className="tick-corner tl" />
      </div>
      <div className="pointer-events-none absolute right-8 top-28 hidden size-10 lg:block">
        <span className="tick-corner tr" />
      </div>
      <div className="pointer-events-none absolute bottom-28 left-8 hidden size-10 lg:block">
        <span className="tick-corner bl" />
      </div>
      <div className="pointer-events-none absolute bottom-28 right-8 hidden size-10 lg:block">
        <span className="tick-corner br" />
      </div>

      {/* Content */}
      <Container className="relative z-10 py-32 md:py-40">
        <div className="flex max-w-3xl flex-col gap-6 lg:gap-8">
          {/* Gold shimmer line */}
          <ScrollReveal direction="left" delay={0.1} distance={40}>
            <div className="gold-shimmer h-[2px] w-20 rounded-full" />
          </ScrollReveal>

          {/* Overline luxe */}
          <ScrollReveal direction="down" delay={0.25} distance={25}>
            <div className="flex items-center gap-4">
              <span className="hairline-gold-solid" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-300/90">
                1999&apos;dan beri güvenin adresi
              </p>
            </div>
          </ScrollReveal>

          {/* Main title — "Insa" serif italic emphasis */}
          <ScrollReveal direction="up" delay={0.45} distance={40}>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Güvenle{' '}
              <span className="relative inline-block">
                <span
                  className="bg-gradient-to-r from-gold-200 via-gold-400 to-gold-300 bg-clip-text font-display font-normal italic text-transparent"
                  style={{ fontVariationSettings: "'opsz' 144" }}
                >
                  İnşa
                </span>
                <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-gradient-to-r from-gold-500 to-transparent" />
              </span>{' '}
              Ediyoruz
            </h1>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal direction="up" delay={0.65} distance={30}>
            <p className="max-w-xl text-base leading-relaxed text-white/55 md:text-lg">
              25 yılı aşkın deneyimimizle, modern mühendislik çözümleri ve
              üstün kalite standartlarıyla hayalinizdeki yapıları
              sağlam temeller üzerine inşa ediyoruz.
            </p>
          </ScrollReveal>

          {/* CTA Buttons */}
          <ScrollReveal direction="up" delay={0.85} distance={20}>
            <div className="mt-2 flex flex-col items-start gap-4 sm:flex-row">
              <Link
                href="/projeler"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-accent px-8 font-sans text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-all duration-300 hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/30 active:scale-[0.98]"
              >
                Projelerimizi İnceleyin
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/iletisim"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/20 px-8 font-sans text-sm font-semibold text-white/90 transition-all duration-300 hover:border-gold-500/40 hover:bg-white/5 hover:text-white active:scale-[0.98]"
              >
                Bize Ulaşın
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </Container>

      {/* Vertical slide counter — bottom right */}
      <div className="absolute bottom-20 right-6 z-10 hidden flex-col items-end gap-3 md:right-10 md:flex">
        <div className="flex flex-col items-end gap-1">
          {HERO_IMAGES.map((_, index) => {
            const isActive = index === selectedIndex
            const label = String(index + 1).padStart(2, '0')
            return (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                aria-label={`${index + 1}. resme geç`}
                className={cn(
                  'font-display text-sm leading-none transition-all duration-300',
                  isActive
                    ? 'text-2xl font-normal text-white'
                    : 'text-xs text-white/35 hover:text-white/60',
                )}
                style={{ fontVariationSettings: "'opsz' 72" }}
              >
                {label}
              </button>
            )
          })}
        </div>
        <div className="flex items-center gap-3">
          <span
            className="font-display text-sm text-gold-300"
            style={{ fontVariationSettings: "'opsz' 72" }}
          >
            {activeLabel}
          </span>
          <span className="h-px w-10 bg-gold-500/40" />
          <span className="font-display text-xs text-white/40">{totalLabel}</span>
        </div>
      </div>

      {/* Mobile dot indicators (retained for small screens) */}
      <div className="absolute bottom-20 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 md:hidden">
        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            aria-label={`${index + 1}. resme geç`}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              index === selectedIndex
                ? 'w-8 bg-white'
                : 'w-1.5 bg-white/40 hover:bg-white/60'
            )}
          />
        ))}
      </div>

      {/* Scroll indicator — vertical line + arrow */}
      <ScrollReveal
        direction="up"
        delay={1.2}
        distance={15}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-white/40">
          <span className="text-[10px] font-medium uppercase tracking-[0.35em]">
            Keşfet
          </span>
          <span className="block h-10 w-px origin-top animate-draw-vertical bg-gradient-to-b from-gold-400/70 to-transparent" />
          <span className="font-display text-sm text-gold-300/80">&darr;</span>
        </div>
      </ScrollReveal>
    </section>
  )
}

export default HeroSection
