import 'server-only'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import type { BlogPost, BlogPostRow, BlogStatus } from '@/types/blog'
import { mapBlogPostRow } from '@/types/blog'

// ============================================================
// PUBLIC READS — server client (anon key, RLS applies)
// ============================================================

export interface GetBlogPostsOptions {
  status?: BlogStatus
  tag?: string
  limit?: number
}

export const getBlogPosts = async (
  opts: GetBlogPostsOptions = {},
): Promise<BlogPost[]> => {
  const supabase = await createSupabaseServerClient()

  let query = supabase
    .from('blog_posts')
    .select('*')
    .order('published_at', { ascending: false })

  if (opts.status) query = query.eq('status', opts.status)
  if (opts.tag) query = query.contains('tags', [opts.tag])
  if (opts.limit) query = query.limit(opts.limit)

  const { data, error } = await query

  if (error) {
    console.error('[getBlogPosts] Supabase error:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    })
    return []
  }

  console.log(`[getBlogPosts] Returned ${data?.length ?? 0} rows`)
  return (data as BlogPostRow[]).map(mapBlogPostRow)
}

export const getBlogPostBySlug = async (
  slug: string,
): Promise<BlogPost | null> => {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    console.error('[getBlogPostBySlug]', error)
    return null
  }

  return data ? mapBlogPostRow(data as BlogPostRow) : null
}

// Lightweight, cookieless fetch for sitemap
export const getBlogPostsForSitemap = async (): Promise<
  { slug: string; updatedAt: string }[]
> => {
  const supabase = createSupabaseAdminClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug, updated_at')
    .eq('status', 'published')

  if (error) {
    console.error('[getBlogPostsForSitemap]', error)
    return []
  }

  return (data as { slug: string; updated_at: string }[]).map((r) => ({
    slug: r.slug,
    updatedAt: r.updated_at,
  }))
}

// ============================================================
// ADMIN WRITES — service_role client (bypasses RLS)
// ============================================================

export const getBlogPostById = async (
  id: string,
): Promise<BlogPost | null> => {
  const supabase = createSupabaseAdminClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    console.error('[getBlogPostById]', error)
    return null
  }

  return data ? mapBlogPostRow(data as BlogPostRow) : null
}

export const getAllBlogPostsForAdmin = async (): Promise<BlogPost[]> => {
  const supabase = createSupabaseAdminClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[getAllBlogPostsForAdmin]', error)
    return []
  }

  return (data as BlogPostRow[]).map(mapBlogPostRow)
}

export const createBlogPost = async (
  input: import('@/types/blog').BlogPostInput,
): Promise<BlogPost> => {
  const supabase = createSupabaseAdminClient()

  // Auto-set published_at when status is published
  const insertData = {
    ...input,
    published_at:
      input.status === 'published' && !input.published_at
        ? new Date().toISOString()
        : input.published_at ?? null,
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .insert(insertData)
    .select('*')
    .single()

  if (error) throw new Error(error.message)
  return mapBlogPostRow(data as BlogPostRow)
}

export const updateBlogPost = async (
  id: string,
  input: Partial<import('@/types/blog').BlogPostInput>,
): Promise<BlogPost> => {
  const supabase = createSupabaseAdminClient()

  // Auto-set published_at when switching to published
  const updateData: Record<string, unknown> = { ...input }
  if (input.status === 'published' && !input.published_at) {
    // Fetch current record to check if already has published_at
    const { data: existing } = await supabase
      .from('blog_posts')
      .select('published_at')
      .eq('id', id)
      .single()

    if (!existing?.published_at) {
      updateData.published_at = new Date().toISOString()
    }
  }

  const { data, error } = await supabase
    .from('blog_posts')
    .update(updateData)
    .eq('id', id)
    .select('*')
    .single()

  if (error) throw new Error(error.message)
  return mapBlogPostRow(data as BlogPostRow)
}

export const deleteBlogPost = async (id: string): Promise<void> => {
  const supabase = createSupabaseAdminClient()
  const { error } = await supabase.from('blog_posts').delete().eq('id', id)
  if (error) throw new Error(error.message)
}
