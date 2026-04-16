import { Suspense } from 'react'
import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import SectionWrapper from '@/components/layout/SectionWrapper'
import { PageHero } from '@/components/shared'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { ProjectsPageContent } from '@/sections/projects'
import { getProjects } from '@/services/projects'
import { createMetadata } from '@/lib/metadata'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = createMetadata({
  title: 'Projeler',
  description:
    'Korkmaz İnşaat olarak tamamladığımız konut, ticari ve karma projelerimizi inceleyin.',
  alternates: { canonical: '/projeler' },
})

// Always fresh — admin edits reflect immediately.
export const dynamic = 'force-dynamic'
export const revalidate = 0

const ProjelerPage = async () => {
  const projects = await getProjects()

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
        overline="PORTFOYUMUZ"
        description="25 yillik deneyimimizle hayata gecirdigimiz konut, ticari ve karma projelerimizi kesfedin."
        backgroundImage="/images/hero/projeler-hero.jpg"
        breadcrumbs={[
          { label: 'Ana Sayfa', href: '/' },
          { label: 'Projeler' },
        ]}
      />

      {/* Projects listing */}
      <SectionWrapper>
        <Container>
          <Suspense>
            <ProjectsPageContent projects={projects} />
          </Suspense>
        </Container>
      </SectionWrapper>
    </>
  )
}

export default ProjelerPage
