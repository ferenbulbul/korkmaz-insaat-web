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
          />
        </ScrollReveal>

        <div className="relative mx-auto max-w-3xl space-y-5">
          <div className="pointer-events-none absolute left-[21px] top-3 h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-accent/10 via-accent/40 to-accent/10" />
          {milestones.map((milestone, index) => (
            <ScrollReveal
              key={milestone.year}
              direction="up"
              delay={index * 0.08}
            >
              <article className="relative flex gap-5 rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition-all duration-300 hover:border-accent/25 hover:shadow-md md:p-6">
                <div className="relative z-10 mt-1 flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-sm font-extrabold text-white">
                  {milestone.year}
                </div>
                <div>
                  <h4 className="text-xl font-bold tracking-tight text-foreground">
                    {milestone.title}
                  </h4>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
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
