// ============================================================
// Domain Types (Supabase-backed)
// ============================================================

export type BlogStatus = 'draft' | 'published'

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  featuredImage: string | null
  status: BlogStatus
  tags: string[]
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

export const BLOG_STATUS_LABELS: Record<BlogStatus, string> = {
  draft: 'Taslak',
  published: 'Yayinda',
}

// ============================================================
// DB Row Types (snake_case — as returned by Supabase)
// ============================================================

export interface BlogPostRow {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  featured_image: string | null
  status: BlogStatus
  tags: string[] | null
  published_at: string | null
  created_at: string
  updated_at: string
}

// ============================================================
// Input Types (for create/update API calls)
// ============================================================

export interface BlogPostInput {
  slug: string
  title: string
  excerpt: string
  content: string
  featured_image?: string | null
  status?: BlogStatus
  tags?: string[]
  published_at?: string | null
}

// ============================================================
// Mappers (DB row → Domain)
// ============================================================

export const mapBlogPostRow = (row: BlogPostRow): BlogPost => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  excerpt: row.excerpt,
  content: row.content,
  featuredImage: row.featured_image,
  status: row.status,
  tags: row.tags ?? [],
  publishedAt: row.published_at,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
})
