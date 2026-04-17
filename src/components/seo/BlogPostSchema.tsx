import type { BlogPost } from '@/types/blog'
import { siteConfig } from '@/config/site'
import JsonLd from './JsonLd'

interface BlogPostSchemaProps {
  post: BlogPost
}

const BlogPostSchema = ({ post }: BlogPostSchemaProps) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `${siteConfig.url}/blog/${post.slug}`,
    datePublished: post.publishedAt ?? post.createdAt,
    dateModified: post.updatedAt,
    image: post.featuredImage ?? undefined,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
  }

  return <JsonLd data={data} />
}

export default BlogPostSchema
