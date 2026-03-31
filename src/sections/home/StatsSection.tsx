'use client'

import { Container, SectionWrapper } from '@/components/layout'
import { StatCounter } from '@/components/shared'
import { StaggerContainer, StaggerItem } from '@/components/motion'
import { COMPANY_STATS } from '@/constants/company'

const StatsSection = () => {
  return (
    <SectionWrapper id="istatistikler" bgColor="dark" className="noise-overlay relative overflow-hidden">
      {/* Decorative gold lines */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-gold-500/8 to-transparent" />

      <Container className="relative z-10">
        <StaggerContainer staggerDelay={0.15} className="grid grid-cols-2 gap-8 md:gap-12 lg:grid-cols-4">
          {COMPANY_STATS.map((stat, i) => (
            <StaggerItem key={stat.label} direction="up">
              <div className="relative">
                {/* Divider between items (hidden on first) */}
                {i > 0 && (
                  <div className="pointer-events-none absolute -left-4 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-white/8 lg:block" />
                )}
                <StatCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </SectionWrapper>
  )
}

export default StatsSection
