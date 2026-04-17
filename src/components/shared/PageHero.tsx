import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Container } from '@/components/layout'
import { ScrollReveal } from '@/components/motion'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeroProps {
  title: string
  overline: string
  description: string
  breadcrumbs: BreadcrumbItem[]
  backgroundImage?: string
}

const PageHero = ({
  title,
  overline,
  description,
  breadcrumbs,
  backgroundImage,
}: PageHeroProps) => {
  return (
    <section className="noise-overlay relative flex min-h-[40vh] items-end overflow-hidden pb-14 pt-28 md:min-h-[50vh] md:pb-16 md:pt-36">
      {/* Base */}
      <div className="absolute inset-0 bg-[#0C0A09]" />

      {/* Background image (if provided) */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover opacity-60"
          style={{ backgroundImage: `url(${backgroundImage})`, backgroundPosition: 'center' }}
        />
      )}

      {/* Duotone overlay — darker top and bottom, lighter middle */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C0A09]/80 via-[#1C1917]/40 to-[#0C0A09]/85" />

      {/* Gold radial hint from right edge */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 100% 50%, rgba(184, 150, 46, 0.1), transparent 60%)',
        }}
      />

      {/* Corner tick frames */}
      <div className="pointer-events-none absolute left-8 top-28 hidden h-14 w-14 md:block">
        <span className="tick-corner tl" />
      </div>
      <div className="pointer-events-none absolute bottom-10 right-8 hidden h-14 w-14 md:block">
        <span className="tick-corner br" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl">
          {/* Breadcrumb */}
          <ScrollReveal direction="down" distance={20}>
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-white/55"
            >
              {breadcrumbs.map((item, index) => (
                <div key={item.label} className="flex items-center gap-2">
                  {item.href ? (
                    <Link href={item.href} className="transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-gold-300">{item.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <ChevronRight className="size-3 text-white/30" />
                  )}
                </div>
              ))}
            </nav>
            <div className="hairline-gold mb-10 max-w-[180px]" />
          </ScrollReveal>

          {/* Eyebrow with flanking hairlines */}
          <ScrollReveal direction="up" delay={0.15} distance={20}>
            <div className="mb-6 flex items-center gap-4">
              <span className="hairline-gold-solid" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-300">
                {overline}
              </span>
              <span className="hairline-gold-sm hidden sm:inline-block" />
            </div>
          </ScrollReveal>

          {/* Display title — Fraunces serif */}
          <ScrollReveal direction="up" delay={0.3} distance={30}>
            <h1
              className="font-display text-5xl font-normal leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl"
              style={{ fontVariationSettings: "'opsz' 96" }}
            >
              {title}
            </h1>
          </ScrollReveal>

          {/* Description */}
          <ScrollReveal direction="up" delay={0.45} distance={25}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
              {description}
            </p>
          </ScrollReveal>
        </div>
      </Container>

      {/* Bottom gold rule */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
    </section>
  )
}

export default PageHero
