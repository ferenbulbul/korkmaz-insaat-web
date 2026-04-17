import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { BreadcrumbSchema, BlogPostSchema } from '@/components/seo'
import BlogContent from '@/sections/blog/BlogContent'
import { getBlogPostBySlug } from '@/services/blog'
import { createMetadata } from '@/lib/metadata'
import { siteConfig } from '@/config/site'

interface PageProps {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return createMetadata({
      title: 'Yazi Bulunamadi',
    })
  }

  const seoTitle = `${post.title} | Korkmaz İnşaat Blog`
  const seoDescription = post.excerpt

  return createMetadata({
    title: seoTitle,
    description: seoDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: seoTitle,
      description: seoDescription,
      url: `${siteConfig.url}/blog/${post.slug}`,
      images: post.featuredImage
        ? [{ url: post.featuredImage, width: 1200, height: 630, alt: post.title }]
        : undefined,
    },
  })
}

const BlogDetailPage = async ({ params }: PageProps) => {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: siteConfig.url },
          { name: 'Blog', url: `${siteConfig.url}/blog` },
          { name: post.title, url: `${siteConfig.url}/blog/${post.slug}` },
        ]}
      />
      <BlogPostSchema post={post} />

      <BlogContent post={post} />
    </>
  )
}

export default BlogDetailPage
