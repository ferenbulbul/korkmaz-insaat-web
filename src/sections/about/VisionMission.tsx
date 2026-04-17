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
            serif
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Vision Card */}
          <ScrollReveal direction="left" delay={0.1}>
            <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-8 transition-all duration-300 hover:border-accent/30 hover:shadow-lg md:p-10">
              {/* Top accent hairline on hover */}
              <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-accent via-gold-300 to-accent/0 transition-transform duration-700 ease-out group-hover:scale-x-100" />

              <Eye className="mb-6 size-7 text-gold-500" />
              <h3
                className="mb-4 font-display text-2xl font-medium tracking-tight text-foreground"
                style={{ fontVariationSettings: "'opsz' 48" }}
              >
                Vizyonumuz
              </h3>
              <div className="mb-5 h-px w-12 bg-gold-500/50" />
              <p className="leading-relaxed text-muted-foreground">
                {COMPANY_INFO.vision}
              </p>
            </div>
          </ScrollReveal>

          {/* Mission Card */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-8 transition-all duration-300 hover:border-accent/30 hover:shadow-lg md:p-10">
              {/* Top accent hairline on hover */}
              <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-accent via-gold-300 to-accent/0 transition-transform duration-700 ease-out group-hover:scale-x-100" />

              <Target className="mb-6 size-7 text-gold-500" />
              <h3
                className="mb-4 font-display text-2xl font-medium tracking-tight text-foreground"
                style={{ fontVariationSettings: "'opsz' 48" }}
              >
                Misyonumuz
              </h3>
              <div className="mb-5 h-px w-12 bg-gold-500/50" />
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
