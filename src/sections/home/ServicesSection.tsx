import { Container, SectionWrapper } from '@/components/layout'
import { SectionTitle, ServiceCard } from '@/components/shared'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion'
import { SERVICES } from '@/constants/services'

const ServicesSection = () => {
  return (
    <SectionWrapper id="hizmetler" bgColor="muted">
      <Container>
        <ScrollReveal direction="up">
          <SectionTitle
            overline="HİZMETLERİMİZ"
            title="Profesyonel İnşaat Çözümleri"
            description="Her projede en yüksek kalite standartlarını uygulayarak, müşterilerimize güvenilir ve sürdürülebilir inşaat hizmetleri sunuyoruz."
            alignment="center"
            serif
          />
        </ScrollReveal>
        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {SERVICES.map((service, index) => (
            <StaggerItem key={service.id} direction="up">
              <ServiceCard service={service} index={index} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </SectionWrapper>
  )
}

export default ServicesSection
