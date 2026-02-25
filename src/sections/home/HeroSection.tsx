import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { Container } from '@/components/layout'
import { ScrollReveal } from '@/components/motion'
import { COMPANY_INFO } from '@/constants/company'

const HeroSection = () => {
  return (
    <section className="relative -mt-20 flex min-h-screen items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop)',
        }}
      />

      {/* Dark overlay — charcoal tone */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0C0A09]/90 via-[#0C0A09]/65 to-[#0C0A09]/35" />

      {/* Bottom gradient for smooth section transition */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-[#FAFAF9] to-transparent" />

      {/* Subtle geometric line pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, transparent, transparent 80px, #B8962E 80px, #B8962E 81px)',
        }}
      />

      {/* Corner frame accents */}
      <div className="pointer-events-none absolute left-8 top-28 hidden size-32 border-l-2 border-t-2 border-gold-300/20 lg:block" />
      <div className="pointer-events-none absolute bottom-12 right-8 hidden size-32 border-b-2 border-r-2 border-gold-300/20 lg:block" />

      {/* Content */}
      <Container className="relative z-10 py-32 md:py-40">
        <div className="flex max-w-3xl flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          {/* Gold separator line */}
          <ScrollReveal direction="left" delay={0.1} distance={40}>
            <div className="h-0.5 w-16 bg-gradient-to-r from-gold-500 to-gold-300" />
          </ScrollReveal>

          {/* Overline */}
          <ScrollReveal direction="down" delay={0.25} distance={25}>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-300">
              {COMPANY_INFO.name.toUpperCase()} — GONEN
            </p>
          </ScrollReveal>

          {/* Main title */}
          <ScrollReveal direction="up" delay={0.45} distance={40}>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
              Guvenle{' '}
              <span className="bg-gradient-to-r from-gold-300 via-gold-500 to-gold-400 bg-clip-text text-transparent">
                Insa
              </span>{' '}
              Ediyoruz
            </h1>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal direction="up" delay={0.65} distance={30}>
            <p className="max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
              25 yili askin deneyimimizle, modern muhendislik cozumleri ve
              ustun kalite standartlariyla Gonen&apos;de guvenin adresiyiz.
              Hayalinizdeki yapilari, saglam temeller uzerine insa ediyoruz.
            </p>
          </ScrollReveal>

          {/* CTA Buttons */}
          <ScrollReveal direction="up" delay={0.85} distance={20}>
            <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
              <Link
                href="/projeler"
                className="inline-flex h-13 items-center justify-center rounded-lg bg-accent px-8 text-[15px] font-semibold text-white shadow-lg shadow-accent/20 transition-all duration-300 hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/30 active:scale-[0.98]"
              >
                Projelerimizi Inceleyin
              </Link>
              <Link
                href="/iletisim"
                className="inline-flex h-13 items-center justify-center rounded-lg border border-white/25 px-8 text-[15px] font-semibold text-white transition-all duration-300 hover:border-white/50 hover:bg-white/10 active:scale-[0.98]"
              >
                Bize Ulasin
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </Container>

      {/* Scroll indicator */}
      <ScrollReveal
        direction="up"
        delay={1.2}
        distance={15}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex animate-bounce flex-col items-center gap-1 text-white/40">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em]">
            Kesfet
          </span>
          <ChevronDown className="size-4" />
        </div>
      </ScrollReveal>
    </section>
  )
}

export default HeroSection
