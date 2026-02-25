import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { createMetadata } from '@/lib/metadata'
import { Container, SectionWrapper } from '@/components/layout'
import { ScrollReveal } from '@/components/motion'
import { SectionTitle } from '@/components/shared'
import { BreadcrumbSchema } from '@/components/seo'
import { siteConfig } from '@/config/site'
import {
  CompanyIntro,
  VisionMission,
  Timeline,
  TeamSection,
  AboutStats,
} from '@/sections/about'

export const metadata: Metadata = createMetadata({
  title: 'Hakkımızda',
  description:
    'Korkmaz İnşaat hakkında bilgi edinin. 1999\'dan beri kaliteli, güvenilir ve sürdürülebilir inşaat projeleri üretiyoruz. Vizyonumuz, misyonumuz ve uzman ekibimiz.',
})

const AboutPage = () => {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: siteConfig.url },
          { name: 'Hakkımızda', url: `${siteConfig.url}/hakkimizda` },
        ]}
      />

      {/* Page Hero */}
      <SectionWrapper bgColor="dark" className="py-20 md:py-28">
        <Container>
          {/* Breadcrumb navigation */}
          <ScrollReveal direction="down" distance={20}>
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex items-center gap-2 text-sm text-primary-foreground/60"
            >
              <Link
                href="/"
                className="transition-colors hover:text-accent"
              >
                Ana Sayfa
              </Link>
              <ChevronRight className="size-4" />
              <span className="font-medium text-accent">Hakkımızda</span>
            </nav>
          </ScrollReveal>

          <ScrollReveal direction="up">
            <SectionTitle
              title="Hakkımızda"
              overline="KORKMAZ İNŞAAT"
              description="1999'dan bu yana güvenle inşa ediyoruz. Kalite, güvenilirlik ve müşteri memnuniyeti odaklı yaklaşımımızla sektörde fark yaratıyoruz."
              alignment="center"
              dark
              className="mb-0 md:mb-0"
            />
          </ScrollReveal>
        </Container>
      </SectionWrapper>

      {/* Page Sections */}
      <CompanyIntro />
      <VisionMission />
      <Timeline />
      <TeamSection />
      <AboutStats />
    </>
  )
}

export default AboutPage
