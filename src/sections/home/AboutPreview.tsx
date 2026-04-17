import Link from 'next/link'
import { ArrowRight, CheckCircle, Calendar, Users, Award } from 'lucide-react'
import { Container, SectionWrapper } from '@/components/layout'
import { SectionTitle } from '@/components/shared'
import { ScrollReveal } from '@/components/motion'
import { COMPANY_INFO } from '@/constants/company'

const highlights = [
  { icon: CheckCircle, value: '150+', label: 'Tamamlanan Proje' },
  { icon: Calendar, value: '25+', label: 'Yillik Deneyim' },
  { icon: Users, value: '80+', label: 'Uzman Kadro' },
  { icon: Award, value: 'A Sinifi', label: 'Kalite Standardi' },
]

const AboutPreview = () => {
  return (
    <SectionWrapper id="hakkimizda" bgColor="muted">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Image with architectural framing */}
          <ScrollReveal direction="left" duration={0.8}>
            <div className="relative">
              {/* Offset gold frame behind */}
              <div className="absolute -bottom-4 -right-4 hidden h-full w-full rounded-2xl border border-accent/15 lg:block" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-stone-200 to-stone-100">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop)',
                  }}
                />
                {/* Tick corner overlays */}
                <span className="tick-corner bl" style={{ bottom: '1rem', left: '1rem' }} />
                <span className="tick-corner tr" style={{ top: '1rem', right: '1rem' }} />
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Content */}
          <ScrollReveal direction="right" delay={0.2} duration={0.8}>
            <div>
              <SectionTitle
                overline="HAKKIMIZDA"
                title="25 Yıllık Deneyim ve Güven"
                alignment="left"
                serif
                className="mb-6 md:mb-8"
              />
              <p className="mb-8 text-base leading-relaxed text-muted-foreground md:text-lg">
                {COMPANY_INFO.description}
              </p>

              {/* Highlights 2x2 grid — editorial style */}
              <div className="mb-8 grid grid-cols-2 gap-4">
                {highlights.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.label}
                      className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-4 transition-all duration-300 hover:border-accent/30 hover:shadow-md"
                    >
                      {/* Subtle top accent on hover */}
                      <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent/50 transition-transform duration-500 group-hover:scale-x-100" />

                      <Icon className="mb-3 size-5 text-gold-500" />
                      <p
                        className="font-display text-2xl font-normal leading-none text-foreground"
                        style={{ fontVariationSettings: "'opsz' 72" }}
                      >
                        {item.value}
                      </p>
                      <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        {item.label}
                      </p>
                    </div>
                  )
                })}
              </div>

              <Link
                href="/hakkimizda"
                className="group inline-flex items-center gap-3 font-sans text-sm font-semibold text-foreground transition-colors hover:text-accent"
              >
                <span className="hairline-gold-solid" />
                Daha Fazla Bilgi
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </SectionWrapper>
  )
}

export default AboutPreview
