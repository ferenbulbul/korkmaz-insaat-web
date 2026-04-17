import { Container, SectionWrapper } from '@/components/layout'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion'
import { SectionTitle, TeamMemberCard } from '@/components/shared'
import { TEAM_MEMBERS } from '@/constants/team'

const TeamSection = () => {
  return (
    <SectionWrapper bgColor="dark" id="team" className="noise-overlay relative overflow-hidden">
      {/* Decorative gold lines */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />

      {/* Tick corners */}
      <span className="tick-corner tl pointer-events-none hidden lg:block" style={{ top: '2rem', left: '2rem' }} />
      <span className="tick-corner br pointer-events-none hidden lg:block" style={{ bottom: '2rem', right: '2rem' }} />

      <Container className="relative z-10">
        <ScrollReveal direction="up">
          <SectionTitle
            overline="EKİBİMİZ"
            title="Uzman Kadromuz"
            description="Alanında deneyimli mühendis, mimar ve teknik ekibimizle projelerinizi en yüksek kalite standartlarında hayata geçiriyoruz."
            alignment="center"
            serif
            dark
          />
        </ScrollReveal>

        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM_MEMBERS.map((member) => (
            <StaggerItem key={member.id} direction="up">
              <TeamMemberCard member={member} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </SectionWrapper>
  )
}

export default TeamSection
