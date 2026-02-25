import Link from 'next/link'
import { Building2, ArrowRight, Award, Users, Calendar, CheckCircle } from 'lucide-react'
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
    <SectionWrapper id="hakkimizda" bgColor="white">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left: Image placeholder */}
          <ScrollReveal direction="left" duration={0.8}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-secondary to-border/50">
              <div className="flex h-full w-full items-center justify-center">
                <Building2 className="size-20 text-muted-foreground/30" />
              </div>
              {/* Decorative accent corner */}
              <div className="absolute bottom-0 left-0 h-2 w-1/3 bg-accent" />
              <div className="absolute bottom-0 left-0 h-1/4 w-2 bg-accent" />
            </div>
          </ScrollReveal>

          {/* Right: Content */}
          <ScrollReveal direction="right" delay={0.2} duration={0.8}>
          <div>
            <SectionTitle
              overline="HAKKIMIZDA"
              title="25 Yillik Deneyim ve Guven"
              alignment="left"
              className="mb-6 md:mb-8"
            />
            <p className="mb-8 text-base leading-relaxed text-muted-foreground md:text-lg">
              {COMPANY_INFO.description}
            </p>

            {/* Highlights 2x2 grid */}
            <div className="mb-8 grid grid-cols-2 gap-4">
              {highlights.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-lg border bg-card p-3"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <Icon className="size-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-lg font-bold leading-tight text-foreground">
                        {item.value}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.label}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <Link
              href="/hakkimizda"
              className="inline-flex items-center gap-2 text-base font-semibold text-accent transition-colors hover:underline"
            >
              Daha Fazla Bilgi
              <ArrowRight className="size-4" />
            </Link>
          </div>
          </ScrollReveal>
        </div>
      </Container>
    </SectionWrapper>
  )
}

export default AboutPreview
