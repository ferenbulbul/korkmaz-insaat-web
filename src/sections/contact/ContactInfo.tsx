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
    title: 'Calisma Saatleri',
    content: 'Pazartesi - Cuma: 08:00 - 18:00\nCumartesi: 09:00 - 14:00',
  },
]

const ContactInfo = () => {
  return (
    <SectionWrapper bgColor="white">
      <Container>
        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {infoCards.map((card) => {
            const Icon = card.icon
            const ContentWrapper = card.href ? 'a' : 'div'

            return (
              <StaggerItem key={card.title} direction="up">
                <div className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-border/70 bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/20 hover:shadow-xl hover:shadow-accent/10">
                  {/* Top accent line */}
                  <div className="absolute left-0 top-0 h-[2px] w-0 bg-accent transition-all duration-500 group-hover:w-full" />

                  {/* Icon circle */}
                  <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-accent/8 transition-colors duration-300 group-hover:bg-accent/15">
                    <Icon className="size-6 text-accent" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    {card.title}
                  </h3>

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
