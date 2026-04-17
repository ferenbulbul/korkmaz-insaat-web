import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { Container, SectionWrapper } from '@/components/layout'
import { StaggerContainer, StaggerItem } from '@/components/motion'
import { siteConfig } from '@/config/site'

interface InfoCard {
  icon: React.ElementType
  title: string
  content: string
  href?: string
}

const infoCards: InfoCard[] = [
  {
    icon: MapPin,
    title: 'Adresimiz',
    content: siteConfig.links.address,
  },
  {
    icon: Phone,
    title: 'Telefon',
    content: siteConfig.links.phone,
    href: `tel:${siteConfig.links.phone.replace(/\s/g, '')}`,
  },
  {
    icon: Mail,
    title: 'E-posta',
    content: siteConfig.links.email,
    href: `mailto:${siteConfig.links.email}`,
  },
  {
    icon: Clock,
    title: 'Çalışma Saatleri',
    content: 'Pazartesi - Cuma: 08:00 - 18:00\nCumartesi: 09:00 - 14:00',
  },
]

const ContactInfo = () => {
  return (
    <SectionWrapper bgColor="white">
      <Container>
        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {infoCards.map((card, index) => {
            const Icon = card.icon
            const ContentWrapper = card.href ? 'a' : 'div'
            const indexLabel = String(index + 1).padStart(2, '0')

            return (
              <StaggerItem key={card.title} direction="up">
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card p-7 transition-all duration-300 hover:border-accent/30 hover:shadow-lg">
                  {/* Animated top accent */}
                  <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-accent via-gold-300 to-accent/0 transition-transform duration-700 ease-out group-hover:scale-x-100" />

                  {/* Header: index + icon */}
                  <div className="mb-6 flex items-start justify-between">
                    <span
                      className="index-number text-2xl opacity-30 transition-opacity duration-500 group-hover:opacity-60"
                      style={{ fontVariationSettings: "'opsz' 72" }}
                    >
                      {indexLabel}
                    </span>
                    <Icon className="size-6 text-gold-500" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    {card.title}
                  </h3>

                  {/* Hairline */}
                  <div className="relative mb-4 mt-3 h-px bg-border/50">
                    <span className="absolute left-0 top-0 h-full w-10 bg-gold-500/50 transition-all duration-500 ease-out group-hover:w-full group-hover:bg-gold-500/30" />
                  </div>

                  {/* Content */}
                  <ContentWrapper
                    {...(card.href
                      ? {
                          href: card.href,
                          className:
                            'text-sm leading-relaxed text-foreground transition-colors hover:text-accent',
                        }
                      : {
                          className: 'text-sm leading-relaxed text-foreground',
                        })}
                  >
                    {card.content.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < card.content.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </ContentWrapper>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </Container>
    </SectionWrapper>
  )
}

export default ContactInfo
