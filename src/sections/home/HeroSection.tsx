import Link from 'next/link'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout'
import { ScrollReveal } from '@/components/motion'

const HeroSection = () => {
  return (
    <section className="noise-overlay relative -mt-20 flex min-h-screen items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop)',
        }}
      />

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

      {/* Corner frame accents — architectural framing */}
      <div className="pointer-events-none absolute left-8 top-28 hidden lg:block">
        <div className="h-24 w-px bg-gradient-to-b from-gold-300/40 to-transparent" />
        <div className="absolute left-0 top-0 h-px w-24 bg-gradient-to-r from-gold-300/40 to-transparent" />
      </div>
      <div className="pointer-events-none absolute bottom-32 right-8 hidden lg:block">
        <div className="h-24 w-px bg-gradient-to-t from-gold-300/40 to-transparent" />
        <div className="absolute bottom-0 right-0 h-px w-24 bg-gradient-to-l from-gold-300/40 to-transparent" />
      </div>

      {/* Content */}
      <Container className="relative z-10 py-32 md:py-40">
        <div className="flex max-w-3xl flex-col gap-6 lg:gap-8">
          {/* Gold shimmer line */}
          <ScrollReveal direction="left" delay={0.1} distance={40}>
            <div className="gold-shimmer h-[2px] w-20 rounded-full" />
          </ScrollReveal>

          {/* Overline */}
          <ScrollReveal direction="down" delay={0.25} distance={25}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold-300/80">
              1999&apos;dan beri guvenin adresi
            </p>
          </ScrollReveal>

          {/* Main title — architectural weight */}
          <ScrollReveal direction="up" delay={0.45} distance={40}>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Guvenle{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-gold-200 via-gold-400 to-gold-300 bg-clip-text text-transparent">
                  Insa
                </span>
                <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-gradient-to-r from-gold-500 to-transparent" />
              </span>{' '}
              Ediyoruz
            </h1>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal direction="up" delay={0.65} distance={30}>
            <p className="max-w-xl text-base leading-relaxed text-white/55 md:text-lg">
              25 yili askin deneyimimizle, modern muhendislik cozumleri ve
              ustun kalite standartlariyla hayalinizdeki yapilari
              saglam temeller uzerine insa ediyoruz.
            </p>
          </ScrollReveal>

          {/* CTA Buttons */}
          <ScrollReveal direction="up" delay={0.85} distance={20}>
            <div className="mt-2 flex flex-col items-start gap-4 sm:flex-row">
              <Link
                href="/projeler"
                className="group inline-flex h-13 items-center justify-center gap-2 rounded-lg bg-accent px-8 text-[15px] font-semibold text-white shadow-lg shadow-accent/20 transition-all duration-300 hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/30 active:scale-[0.98]"
              >
                Projelerimizi Inceleyin
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/iletisim"
                className="inline-flex h-13 items-center justify-center rounded-lg border border-white/20 px-8 text-[15px] font-semibold text-white/90 transition-all duration-300 hover:border-gold-500/40 hover:bg-white/5 hover:text-white active:scale-[0.98]"
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
        className="absolute bottom-12 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex animate-bounce flex-col items-center gap-1.5 text-white/30">
          <span className="text-[10px] font-medium uppercase tracking-[0.25em]">
            Kesfet
          </span>
          <ChevronDown className="size-4" />
        </div>
      </ScrollReveal>
    </section>
  )
}

export default HeroSection
