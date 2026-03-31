import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import SectionWrapper from '@/components/layout/SectionWrapper'
import { PageHero } from '@/components/shared'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { ProjectsPageContent } from '@/sections/projects'
import { PROJECTS } from '@/constants/projects'
import { createMetadata } from '@/lib/metadata'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = createMetadata({
  title: 'Projeler',
  description:
    'Korkmaz İnşaat olarak tamamladığımız konut, ticari, altyapı ve renovasyon projelerimizi inceleyin.',
  alternates: { canonical: '/projeler' },
})

const ProjelerPage = () => {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: siteConfig.url },
          { name: 'Projeler', url: `${siteConfig.url}/projeler` },
        ]}
      />

      <PageHero
        title="Projelerimiz"
        overline="PORTFÖYÜMÜZ"
        description="25 yıllık deneyimimizle hayata geçirdiğimiz konut, ticari, altyapı ve renovasyon projelerimizi keşfedin."
        backgroundImage="https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2000&auto=format&fit=crop"
        breadcrumbs={[
          { label: 'Ana Sayfa', href: '/' },
          { label: 'Projeler' },
        ]}
      />

      {/* Projects listing */}
      <SectionWrapper>
        <Container>
          <ProjectsPageContent projects={PROJECTS} />
        </Container>
      </SectionWrapper>
    </>
  )
}

export default ProjelerPage
