import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'
import { Container, SectionWrapper } from '@/components/layout'
import { ScrollReveal } from '@/components/motion'
import { siteConfig } from '@/config/site'

const ContactCTA = () => {
  return (
    <SectionWrapper bgColor="dark" className="noise-overlay relative overflow-hidden">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <span className="tick-corner tl pointer-events-none hidden lg:block" style={{ top: '2rem', left: '2rem' }} />
      <span className="tick-corner br pointer-events-none hidden lg:block" style={{ bottom: '2rem', right: '2rem' }} />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — text */}
          <ScrollReveal direction="left" duration={0.7}>
            <div>
              <div className="mb-6 flex items-center gap-4">
                <span className="h-px w-10 bg-gold-500" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold-300/80">
                  İletişime Geçin
                </span>
              </div>

              <h2 className="font-sans text-3xl font-bold tracking-tight text-white md:text-4xl">
                Projenizi Birlikte<br />
                Hayata Geçirelim
              </h2>

              <p className="mt-5 max-w-md font-sans text-sm leading-relaxed text-white/50 md:text-base">
                İnşaat projeleriniz için profesyonel destek almak ister misiniz?
                Ücretsiz keşif ve fiyat teklifi için hemen bizimle iletişime geçin.
              </p>

              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/iletisim"
                  className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-lg bg-accent px-8 font-sans text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-all duration-300 hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/30 active:scale-[0.98]"
                >
                  İletişime Geçin
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>

                <a
                  href={`tel:${siteConfig.links.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2.5 font-sans text-sm text-white/50 transition-colors hover:text-gold-300"
                >
                  <Phone className="size-4 text-gold-500/60" />
                  {siteConfig.links.phone}
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — large stat numbers */}
          <ScrollReveal direction="right" delay={0.2} duration={0.7}>
            <div className="grid grid-cols-2 gap-8">
              {[
                { value: '25+', label: 'Yıllık Deneyim' },
                { value: '150+', label: 'Tamamlanan Proje' },
                { value: '80+', label: 'Uzman Kadro' },
                { value: 'A', label: 'Kalite Sınıfı' },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <span
                    className="font-display text-4xl font-normal text-gold-300 md:text-5xl"
                    style={{ fontVariationSettings: "'opsz' 144" }}
                  >
                    {stat.value}
                  </span>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </SectionWrapper>
  )
}

export default ContactCTA
