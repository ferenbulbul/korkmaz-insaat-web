import { Container, SectionWrapper } from '@/components/layout'
import { ScrollReveal } from '@/components/motion'
import { SectionTitle, ContactForm, MapPlaceholder } from '@/components/shared'
import { siteConfig } from '@/config/site'
import { Clock } from 'lucide-react'

const ContactFormSection = () => {
  return (
    <SectionWrapper bgColor="muted">
      <Container>
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-2">
          {/* Left column: Form */}
          <ScrollReveal direction="left" duration={0.7}>
            <div className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-sm md:p-8">
              <SectionTitle
                overline="BİZE YAZIN"
                title="İletişim Formu"
                alignment="left"
                serif
                className="mb-6 md:mb-8"
              />

              <p className="mb-8 text-muted-foreground">
                Projeleriniz hakkında bilgi almak veya teklif istemek için formu
                doldurun. En kısa sürede size dönüş yapacağız.
              </p>

              <div className="flex-1">
                <ContactForm />
              </div>
            </div>
          </ScrollReveal>

          {/* Right column: Map + note — stretches to match form height */}
          <ScrollReveal direction="right" delay={0.2} duration={0.7}>
            <div className="flex h-full flex-col gap-6">
              <MapPlaceholder
                address={siteConfig.links.address}
                className="flex-1 rounded-2xl border border-border/60 shadow-sm"
              />

              <div className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-border/60 bg-card p-5 transition-all duration-300 hover:border-accent/30 hover:shadow-sm">
                {/* Top accent on hover */}
                <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent/40 transition-transform duration-500 group-hover:scale-x-100" />

                <Clock className="mt-0.5 size-5 shrink-0 text-gold-500" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Mesajınızı aldıktan sonra{' '}
                  <span className="font-semibold text-foreground">
                    24 saat içinde
                  </span>{' '}
                  size dönüş yapacağız.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </SectionWrapper>
  )
}

export default ContactFormSection
