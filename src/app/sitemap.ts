import type { MetadataRoute } from 'next'
import { getProjectsForSitemap } from '@/services/projects'
import { getBlogPostsForSitemap } from '@/services/blog'
import { siteConfig } from '@/config/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/projeler`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/iletisim`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Fetch projects defensively — if Supabase env vars are missing during build
  // (e.g. preview deploys without secrets), fall back to static pages only.
  let projectPages: MetadataRoute.Sitemap = []
  try {
    const projects = await getProjectsForSitemap()
    projectPages = projects.map((project) => ({
      url: `${siteConfig.url}/projeler/${project.slug}`,
      lastModified: new Date(project.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  } catch (err) {
    console.warn('[sitemap] Could not fetch projects:', err)
  }

  // Fetch blog posts
  let blogPages: MetadataRoute.Sitemap = []
  try {
    const blogPosts = await getBlogPostsForSitemap()
    blogPages = blogPosts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (err) {
    console.warn('[sitemap] Could not fetch blog posts:', err)
  }

  return [...staticPages, ...projectPages, ...blogPages]
}
