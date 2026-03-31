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
    <SectionWrapper id="hakkimizda" bgColor="white">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Image placeholder with architectural framing */}
          <ScrollReveal direction="left" duration={0.8}>
            <div className="relative">
              {/* Offset gold frame behind */}
              <div className="absolute -bottom-4 -right-4 hidden h-full w-full rounded-xl border-2 border-accent/15 lg:block" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-stone-200 to-stone-100">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop)',
                  }}
                />
                {/* Decorative accent corners */}
                <div className="absolute bottom-0 left-0 h-1/4 w-[2px] bg-gradient-to-t from-accent to-transparent" />
                <div className="absolute bottom-0 left-0 h-[2px] w-1/3 bg-gradient-to-r from-accent to-transparent" />
              </div>
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
              <div className="mb-8 grid grid-cols-2 gap-3">
                {highlights.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.label}
                      className="group flex items-center gap-3 rounded-lg border bg-card p-3 transition-all duration-300 hover:border-accent/20 hover:shadow-md"
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/8 transition-colors duration-300 group-hover:bg-accent/15">
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
                className="group inline-flex items-center gap-2 text-base font-semibold text-accent transition-colors hover:text-accent/80"
              >
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
