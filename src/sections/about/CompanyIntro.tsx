import { Container, SectionWrapper } from '@/components/layout'
import { ScrollReveal } from '@/components/motion'
import { SectionTitle } from '@/components/shared'
import { COMPANY_INFO } from '@/constants/company'

const CompanyIntro = () => {
  return (
    <SectionWrapper bgColor="white" id="company-intro">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Image with architectural framing */}
          <ScrollReveal direction="left" duration={0.8}>
            <div className="relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/40">
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url(https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1400&auto=format&fit=crop)',
                  }}
                />
              </div>
              {/* Tick corners instead of chunky gold block */}
              <span className="tick-corner bl pointer-events-none" style={{ bottom: '-0.75rem', left: '-0.75rem' }} />
              <span className="tick-corner tr pointer-events-none" style={{ top: '-0.75rem', right: '-0.75rem' }} />
            </div>
          </ScrollReveal>

          {/* Right: Company description */}
          <ScrollReveal direction="right" delay={0.2} duration={0.8}>
            <div>
              <SectionTitle
                overline="HAKKIMIZDA"
                title="Korkmaz İnşaat"
                alignment="left"
                serif
                className="mb-6 md:mb-8"
              />

              <p className="dropcap text-base leading-relaxed text-muted-foreground md:text-lg">
                {COMPANY_INFO.longDescription}
              </p>

              {/* Gold hairline separator */}
              <div className="hairline-gold my-8 max-w-[120px]" />

              {/* Founded year highlight — Fraunces */}
              <div className="flex items-baseline gap-4">
                <span
                  className="font-display text-5xl font-normal text-foreground md:text-6xl"
                  style={{ fontVariationSettings: "'opsz' 144" }}
                >
                  {COMPANY_INFO.founded}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  &apos;dan beri<br />sektörde
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
