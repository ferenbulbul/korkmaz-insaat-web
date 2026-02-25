import { Container, SectionWrapper } from '@/components/layout'
import { ScrollReveal } from '@/components/motion'
import { SectionTitle, ContactForm, MapPlaceholder } from '@/components/shared'
import { siteConfig } from '@/config/site'
import { Clock } from 'lucide-react'

const ContactFormSection = () => {
  return (
    <SectionWrapper bgColor="muted">
      <Container>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Left column: Form */}
          <ScrollReveal direction="left" duration={0.7}>
            <div>
              <SectionTitle
                overline="BIZE YAZIN"
                title="Iletisim Formu"
                alignment="left"
              />

              <p className="-mt-6 mb-8 text-muted-foreground md:-mt-10">
                Projeleriniz hakkinda bilgi almak veya teklif istemek icin formu
                doldurun. En kisa surede size donus yapacagiz.
              </p>

              <ContactForm />
            </div>
          </ScrollReveal>

          {/* Right column: Map & note */}
          <ScrollReveal direction="right" delay={0.2} duration={0.7}>
            <div className="flex flex-col gap-6">
              <MapPlaceholder
                address={siteConfig.links.address}
                className="min-h-[400px]"
              />

              <div className="flex items-start gap-3 rounded-lg border bg-card p-4">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <Clock className="size-4 text-accent" />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Mesajinizi aldiktan sonra{' '}
                  <span className="font-semibold text-foreground">
                    24 saat icinde
                  </span>{' '}
                  size donus yapacagiz.
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
