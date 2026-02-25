import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { OrganizationSchema } from '@/components/seo'
import {
  HeroSection,
  ServicesSection,
  ProjectsShowcase,
  AboutPreview,
} from '@/sections/home'

export const metadata: Metadata = createMetadata({
  title: 'Ana Sayfa | Korkmaz İnşaat',
  description:
    'Korkmaz İnşaat - 25 yılı aşkın deneyimle güvenilir inşaat hizmetleri. Konut, ticari yapı, altyapı ve renovasyon projelerinde profesyonel çözümler.',
})

const HomePage = () => {
  return (
    <>
      <OrganizationSchema />
      <HeroSection />
      <ServicesSection />
      <ProjectsShowcase />
      <AboutPreview />
    </>
  )
}

export default HomePage
