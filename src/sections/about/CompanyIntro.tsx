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
              <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-gradient-to-br from-gold-100 to-secondary">
                <div className="flex h-full w-full items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-3 size-16 rounded-full bg-accent/15" />
                    <p className="text-sm font-medium text-muted-foreground">
                      Firma Gorseli
                    </p>
                  </div>
                </div>
              </div>
              {/* Decorative gold accent square */}
              <div className="absolute -bottom-4 -right-4 -z-10 size-24 rounded-lg bg-accent md:-bottom-6 md:-right-6 md:size-32" />
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
