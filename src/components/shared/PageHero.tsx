import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Container } from '@/components/layout'
import { ScrollReveal } from '@/components/motion'
import SectionTitle from './SectionTitle'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeroProps {
  title: string
  overline: string
  description: string
  breadcrumbs: BreadcrumbItem[]
  backgroundImage?: string
}

const PageHero = ({
  title,
  overline,
  description,
  breadcrumbs,
  backgroundImage,
}: PageHeroProps) => {
  return (
    <section className="noise-overlay relative overflow-hidden pb-16 pt-24 md:pb-20 md:pt-32">
      <div className="absolute inset-0 bg-[#0C0A09]" />
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0C0A09]/95 via-[#1C1917]/85 to-[#0C0A09]/95" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
        backgroundImage:
          'repeating-linear-gradient(135deg, transparent, transparent 70px, #B8962E 70px, #B8962E 71px)',
      }} />

      <Container className="relative z-10">
        <ScrollReveal direction="down" distance={20}>
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/55"
          >
            {breadcrumbs.map((item, index) => (
              <div key={item.label} className="flex items-center gap-2">
                {item.href ? (
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-medium text-gold-300">{item.label}</span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <ChevronRight className="size-4 text-white/30" />
                )}
              </div>
            ))}
          </nav>
        </ScrollReveal>

        <ScrollReveal direction="up">
          <SectionTitle
            overline={overline}
            title={title}
            description={description}
            alignment="center"
            dark
            className="mb-0"
          />
        </ScrollReveal>
      </Container>
    </section>
  )
}

export default PageHero
