import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { PageHero } from '@/components/shared'
import { BreadcrumbSchema } from '@/components/seo'
import { siteConfig } from '@/config/site'
import {
  CompanyIntro,
  VisionMission,
  Timeline,
  TeamSection,
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

      <PageHero
        title="Hakkımızda"
        overline="KORKMAZ İNŞAAT"
        description="1999'dan bu yana güvenle inşa ediyoruz. Kalite, güvenilirlik ve müşteri memnuniyeti odaklı yaklaşımımızla sektörde fark yaratıyoruz."
        backgroundImage="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop"
        breadcrumbs={[
          { label: 'Ana Sayfa', href: '/' },
          { label: 'Hakkımızda' },
        ]}
      />

      {/* Page Sections */}
      <CompanyIntro />
      <VisionMission />
      <Timeline />
      <TeamSection />
    </>
  )
}

export default AboutPage
