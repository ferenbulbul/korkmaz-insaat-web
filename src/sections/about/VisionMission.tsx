import { Eye, Target } from 'lucide-react'
import { Container, SectionWrapper } from '@/components/layout'
import { ScrollReveal } from '@/components/motion'
import { SectionTitle } from '@/components/shared'
import { COMPANY_INFO } from '@/constants/company'

const VisionMission = () => {
  return (
    <SectionWrapper bgColor="muted" id="vision-mission">
      <Container>
        <ScrollReveal direction="up">
          <SectionTitle
            overline="VİZYON & MİSYON"
            title="Değerlerimiz"
            alignment="center"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Vision Card */}
          <ScrollReveal direction="left" delay={0.1}>
            <div className="rounded-xl border-l-4 border-accent bg-background p-8 shadow-sm transition-shadow duration-300 hover:shadow-md">
              <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-accent/10">
                <Eye className="size-7 text-accent" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">
                Vizyonumuz
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {COMPANY_INFO.vision}
              </p>
            </div>
          </ScrollReveal>

          {/* Mission Card */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="rounded-xl border-l-4 border-accent bg-background p-8 shadow-sm transition-shadow duration-300 hover:shadow-md">
              <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-accent/10">
                <Target className="size-7 text-accent" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">
                Misyonumuz
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {COMPANY_INFO.mission}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </SectionWrapper>
  )
}

export default VisionMission
