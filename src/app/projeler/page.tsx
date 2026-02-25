import type { Metadata } from 'next'
import Link from 'next/link'
import Container from '@/components/layout/Container'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionTitle from '@/components/shared/SectionTitle'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { ScrollReveal } from '@/components/motion'
import { ProjectsPageContent } from '@/sections/projects'
import { PROJECTS } from '@/constants/projects'
import { createMetadata } from '@/lib/metadata'
import { siteConfig } from '@/config/site'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

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

      {/* Page header */}
      <SectionWrapper bgColor="muted" className="py-12 md:py-16">
        <Container>
          <ScrollReveal direction="down" distance={20}>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Ana Sayfa</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Projeler</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </ScrollReveal>

          <ScrollReveal direction="up">
            <SectionTitle
              overline="Portföyümüz"
              title="Projelerimiz"
              description="25 yıllık deneyimimizle hayata geçirdiğimiz konut, ticari, altyapı ve renovasyon projelerimizi keşfedin."
              className="mb-0 mt-6"
            />
          </ScrollReveal>
        </Container>
      </SectionWrapper>

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
