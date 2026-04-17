import type { Metadata } from 'next'
import Container from '@/components/layout/Container'
import SectionWrapper from '@/components/layout/SectionWrapper'
import { PageHero } from '@/components/shared'
import { BreadcrumbSchema } from '@/components/seo'
import BlogList from '@/sections/blog/BlogList'
import { getBlogPosts } from '@/services/blog'
import { createMetadata } from '@/lib/metadata'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = createMetadata({
  title: 'Blog | Gönen İnşaat Rehberi ve Haberler',
  description:
    'Gönen, Balıkesir\'de konut sektörü haberleri, satılık daire rehberi ve inşaat dünyasından güncel bilgiler. Korkmaz İnşaat blog.',
  alternates: { canonical: '/blog' },
})

export const dynamic = 'force-dynamic'
export const revalidate = 0

const BlogPage = async () => {
  const posts = await getBlogPosts()

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: siteConfig.url },
          { name: 'Blog', url: `${siteConfig.url}/blog` },
        ]}
      />

      <PageHero
        title="Blog"
        overline="HABERLER VE REHBER"
        description="Gönen'de konut sektörü, satılık daire rehberi ve inşaat dünyasından güncel bilgiler."
        breadcrumbs={[
          { label: 'Ana Sayfa', href: '/' },
          { label: 'Blog' },
        ]}
      />

      <SectionWrapper>
        <Container>
          <BlogList posts={posts} />
        </Container>
      </SectionWrapper>
    </>
  )
}

export default BlogPage
