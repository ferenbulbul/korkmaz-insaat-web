'use client'

import { Container, SectionWrapper } from '@/components/layout'
import { StaggerContainer, StaggerItem } from '@/components/motion'
import { StatCounter } from '@/components/shared'
import { COMPANY_STATS } from '@/constants/company'

const AboutStats = () => {
  return (
    <SectionWrapper bgColor="dark" id="about-stats">
      <Container>
        <StaggerContainer staggerDelay={0.15} className="grid grid-cols-2 gap-8 md:gap-12 lg:grid-cols-4">
          {COMPANY_STATS.map((stat) => (
            <StaggerItem key={stat.label} direction="up">
              <StatCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </SectionWrapper>
  )
}

export default AboutStats
