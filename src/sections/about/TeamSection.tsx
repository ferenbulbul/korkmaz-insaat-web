import { Container, SectionWrapper } from '@/components/layout'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion'
import { SectionTitle, TeamMemberCard } from '@/components/shared'
import { TEAM_MEMBERS } from '@/constants/team'

const TeamSection = () => {
  return (
    <SectionWrapper bgColor="muted" id="team">
      <Container>
        <ScrollReveal direction="up">
          <SectionTitle
            overline="EKİBİMİZ"
            title="Uzman Kadromuz"
            description="Alanında deneyimli mühendis, mimar ve teknik ekibimizle projelerinizi en yüksek kalite standartlarında hayata geçiriyoruz."
            alignment="center"
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
