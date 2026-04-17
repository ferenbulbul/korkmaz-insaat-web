import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ProjectDetail, ProjectGallery } from '@/sections/projects'
import { BreadcrumbSchema, ProjectSchema } from '@/components/seo'
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

  const seoTitle = `${project.title} | Gönen Satılık Daire`
  const seoDescription = `${project.description} Gönen, Balıkesir'de ${project.title} projesi. Korkmaz İnşaat güvencesiyle.`

  return createMetadata({
    title: seoTitle,
    description: seoDescription,
    alternates: { canonical: `/projeler/${project.slug}` },
    openGraph: {
      type: 'article',
      title: seoTitle,
      description: seoDescription,
      url: `${siteConfig.url}/projeler/${project.slug}`,
      images: project.thumbnailUrl
        ? [{ url: project.thumbnailUrl, width: 1200, height: 630, alt: project.title }]
        : undefined,
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
      <ProjectSchema project={project} />

      <ProjectDetail project={project} />

      {project.images.length > 0 && (
        <ProjectGallery images={project.images} />
      )}
    </>
  )
}

export default ProjectDetailPage
