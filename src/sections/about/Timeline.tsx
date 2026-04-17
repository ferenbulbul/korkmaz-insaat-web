import { Container, SectionWrapper } from '@/components/layout'
import { ScrollReveal } from '@/components/motion'
import { SectionTitle } from '@/components/shared'
import { COMPANY_INFO } from '@/constants/company'

const Timeline = () => {
  const milestones = COMPANY_INFO.milestones

  return (
    <SectionWrapper bgColor="white" id="timeline">
      <Container narrow>
        <ScrollReveal direction="up">
          <SectionTitle
            overline="TARİHÇEMİZ"
            title="Kilometre Taşlarımız"
            alignment="center"
            serif
          />
        </ScrollReveal>

        <div className="relative mx-auto max-w-3xl space-y-6">
          {/* Gold timeline line */}
          <div className="pointer-events-none absolute left-[21px] top-3 h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-gold-500/10 via-gold-500/40 to-gold-500/10" />

          {milestones.map((milestone, index) => (
            <ScrollReveal
              key={milestone.year}
              direction="up"
              delay={index * 0.08}
            >
              <article className="group relative flex gap-6 rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-lg md:p-7">
                {/* Year badge — Fraunces serif */}
                <div className="relative z-10 mt-0.5 flex shrink-0 flex-col items-center">
                  <span
                    className="font-display text-2xl font-normal text-accent"
                    style={{ fontVariationSettings: "'opsz' 72" }}
                  >
                    {milestone.year}
                  </span>
                </div>

                <div>
                  {/* Gold hairline separator */}
                  <div className="relative mb-3 h-px bg-border/40">
                    <span className="absolute left-0 top-0 h-full w-8 bg-gold-500/50 transition-all duration-500 group-hover:w-full group-hover:bg-gold-500/30" />
                  </div>
                  <h4
                    className="font-display text-lg font-medium tracking-tight text-foreground md:text-xl"
                    style={{ fontVariationSettings: "'opsz' 48" }}
                  >
                    {milestone.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {milestone.description}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}

export default Timeline
