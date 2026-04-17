import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { PageHero } from '@/components/shared'
import { BreadcrumbSchema } from '@/components/seo'
import { siteConfig } from '@/config/site'
import {
  CompanyIntro,
  VisionMission,
  Timeline,
} from '@/sections/about'

export const metadata: Metadata = createMetadata({
  title: 'Hakkımızda | Gönen\'in Güvenilir Müteahhiti',
  description:
    'Korkmaz İnşaat - Gönen, Balıkesir\'de köklü inşaat firması. Kaliteli, güvenilir ve sürdürülebilir konut projeleri üretiyoruz. Gönen\'de ev yapımında uzman ekibimizi tanıyın.',
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
    </>
  )
}

export default AboutPage
