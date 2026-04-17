import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { OrganizationSchema, FAQSchema } from '@/components/seo'
import {
  HeroSection,
  ServicesSection,
  ProjectsShowcase,
  AboutPreview,
  FAQSection,
} from '@/sections/home'
import { FAQ_ITEMS } from '@/constants/faq'

export const metadata: Metadata = createMetadata({
  title: 'Gönen İnşaat | Korkmaz İnşaat - Satılık Daire ve Konut Projeleri',
  description:
    'Korkmaz İnşaat - Gönen, Balıkesir\'de güvenilir müteahhit. Satılık daireler, konut projeleri ve modern yaşam alanları. Kaliteli işçilik, zamanında teslim. Gönen\'de ev almak için hemen arayın.',
})

const HomePage = () => {
  return (
    <>
      <OrganizationSchema />
      <FAQSchema items={FAQ_ITEMS} />
      <HeroSection />
      <ServicesSection />
      <ProjectsShowcase />
      <AboutPreview />
      <FAQSection />
    </>
  )
}

export default HomePage
