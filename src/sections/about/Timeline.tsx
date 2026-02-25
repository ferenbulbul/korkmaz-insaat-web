import { cn } from '@/lib/utils'
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

        <div className="relative">
          {/* Vertical center line */}
          <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-accent/30 md:left-1/2 md:block md:-translate-x-px" />
          {/* Mobile vertical line */}
          <div className="absolute left-6 top-0 block h-full w-0.5 bg-accent/30 md:hidden" />

          <div className="flex flex-col gap-10 md:gap-12">
            {milestones.map((milestone, index) => {
              const isLeft = index % 2 === 0

              return (
                <ScrollReveal
                  key={milestone.year}
                  direction={isLeft ? 'left' : 'right'}
                  delay={index * 0.1}
                >
                  <div
                    className={cn(
                      'relative flex items-start gap-6',
                      // Desktop: alternating layout
                      'md:gap-0',
                    )}
                  >
                  {/* Mobile layout: dot + content */}
                  <div className="relative z-10 flex-shrink-0 md:hidden">
                    <div className="flex size-12 items-center justify-center rounded-full bg-accent font-bold text-white shadow-md">
                      <span className="text-xs">{milestone.year}</span>
                    </div>
                  </div>

                  <div className="flex-1 md:hidden">
                    <h4 className="text-lg font-bold text-foreground">
                      {milestone.title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>

                  {/* Desktop layout: alternating left/right */}
                  {/* Left content area */}
                  <div
                    className={cn(
                      'hidden w-1/2 md:block',
                      isLeft ? 'pr-12 text-right' : '',
                    )}
                  >
                    {isLeft && (
                      <div>
                        <h4 className="text-lg font-bold text-foreground">
                          {milestone.title}
                        </h4>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {milestone.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Center dot - desktop only */}
                  <div className="relative z-10 hidden flex-shrink-0 md:block">
                    <div className="flex size-12 -translate-x-1/2 items-center justify-center rounded-full bg-accent font-bold text-white shadow-md">
                      <span className="text-xs">{milestone.year}</span>
                    </div>
                  </div>

                  {/* Right content area */}
                  <div
                    className={cn(
                      'hidden w-1/2 md:block',
                      !isLeft ? 'pl-6' : '',
                    )}
                  >
                    {!isLeft && (
                      <div>
                        <h4 className="text-lg font-bold text-foreground">
                          {milestone.title}
                        </h4>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {milestone.description}
                        </p>
                      </div>
                    )}
                  </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}

export default Timeline
