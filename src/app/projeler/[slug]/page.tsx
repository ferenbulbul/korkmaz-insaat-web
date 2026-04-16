import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ProjectDetail, ProjectGallery } from '@/sections/projects'
import CTABanner from '@/components/shared/CTABanner'
import { ScrollReveal } from '@/components/motion'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { getProjectBySlug } from '@/services/projects'
import { createMetadata } from '@/lib/metadata'
import { siteConfig } from '@/config/site'

interface PageProps {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return createMetadata({
      title: 'Proje Bulunamadı',
    })
  }

  return createMetadata({
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projeler/${project.slug}` },
    openGraph: {
      type: 'article',
      title: project.title,
      description: project.description,
      url: `${siteConfig.url}/projeler/${project.slug}`,
    },
  })
}

const ProjectDetailPage = async ({ params }: PageProps) => {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: siteConfig.url },
          { name: 'Projeler', url: `${siteConfig.url}/projeler` },
          { name: project.title, url: `${siteConfig.url}/projeler/${project.slug}` },
        ]}
      />

      <ProjectDetail project={project} />

      {project.images.length > 0 && (
        <ProjectGallery images={project.images} />
      )}

      <ScrollReveal direction="up">
        <CTABanner
          title="Benzer bir proje mi düşünüyorsunuz?"
          description="Deneyimli ekibimizle projenizi hayata geçirelim. Ücretsiz keşif ve fiyat teklifi için hemen iletişime geçin."
          buttonText="Bize Ulaşın"
          href="/iletisim"
        />
      </ScrollReveal>
    </>
  )
}

export default ProjectDetailPage
