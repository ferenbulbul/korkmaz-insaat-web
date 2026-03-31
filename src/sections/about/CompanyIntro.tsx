import { Container, SectionWrapper } from '@/components/layout'
import { ScrollReveal } from '@/components/motion'
import { SectionTitle } from '@/components/shared'
import { COMPANY_INFO } from '@/constants/company'

const CompanyIntro = () => {
  return (
    <SectionWrapper bgColor="white" id="company-intro">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left: Image placeholder with decorative accent */}
          <ScrollReveal direction="left" duration={0.8}>
            <div className="relative">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-gold-100 to-secondary">
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url(https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1400&auto=format&fit=crop)',
                  }}
                >
                  <div className="flex h-full w-full items-end bg-gradient-to-t from-[#0C0A09]/70 via-[#0C0A09]/30 to-transparent p-6">
                    <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-200/90">
                        Kurumsal Güç
                      </p>
                      <p className="mt-1 text-sm font-medium text-white/90">
                        Güvenilir mühendislik, sürdürülebilir yaklaşım
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative gold accent square */}
              <div className="absolute -bottom-5 -right-5 -z-10 size-24 rounded-2xl bg-accent/85 md:-bottom-7 md:-right-7 md:size-32" />
            </div>
          </ScrollReveal>

          {/* Right: Company description */}
          <ScrollReveal direction="right" delay={0.2} duration={0.8}>
            <div>
              <SectionTitle
                overline="HAKKIMIZDA"
                title="Korkmaz Insaat"
                alignment="left"
                className="mb-6 md:mb-8"
              />

              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                {COMPANY_INFO.longDescription}
              </p>

              {/* Gold separator */}
              <div className="my-6 h-1 w-20 rounded bg-accent" />

              {/* Founded year highlight */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-extrabold text-foreground md:text-4xl">
                  {COMPANY_INFO.founded}
                </span>
                <span className="text-base font-medium text-muted-foreground">
                  &apos;dan beri sektorde
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </SectionWrapper>
  )
}

export default CompanyIntro
