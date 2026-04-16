import 'server-only'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import type {
  Project,
  ProjectRow,
  ProjectStatus,
  ProjectCategory,
} from '@/types/project'
import { mapProjectRow } from '@/types/project'

// ============================================================
// PUBLIC READS — server client (anon key, RLS applies)
// ============================================================

export interface GetProjectsOptions {
  status?: ProjectStatus
  category?: ProjectCategory
  featured?: boolean
  limit?: number
}

export const getProjects = async (
  opts: GetProjectsOptions = {},
): Promise<Project[]> => {
  const supabase = await createSupabaseServerClient()

  let query = supabase
    .from('projects')
    .select('*, project_images(*)')
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: false })

  if (opts.status) query = query.eq('status', opts.status)
  if (opts.category) query = query.eq('category', opts.category)
  if (opts.featured !== undefined) query = query.eq('featured', opts.featured)
  if (opts.limit) query = query.limit(opts.limit)

  const { data, error } = await query

  if (error) {
    console.error('[getProjects] Supabase error:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    })
    return []
  }

  console.log(`[getProjects] Returned ${data?.length ?? 0} rows (opts=${JSON.stringify(opts)})`)
  return (data as ProjectRow[]).map(mapProjectRow)
}

export const getProjectBySlug = async (
  slug: string,
): Promise<Project | null> => {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('projects')
    .select('*, project_images(*)')
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    console.error('[getProjectBySlug]', error)
    return null
  }

  return data ? mapProjectRow(data as ProjectRow) : null
}

export const getFeaturedProjects = async (limit = 6): Promise<Project[]> =>
  getProjects({ featured: true, limit })

// Uses admin client so it can run outside a request (build-time generateStaticParams).
export const getAllProjectSlugs = async (): Promise<string[]> => {
  const supabase = createSupabaseAdminClient()
  const { data, error } = await supabase.from('projects').select('slug')
  if (error) {
    console.error('[getAllProjectSlugs]', error)
    return []
  }
  return (data as { slug: string }[]).map((r) => r.slug)
}

// Lightweight, cookieless fetch for static routes (sitemap, etc.)
// Uses admin client which works without a request context.
export const getProjectsForSitemap = async (): Promise<
  { slug: string; updatedAt: string }[]
> => {
  const supabase = createSupabaseAdminClient()
  const { data, error } = await supabase
    .from('projects')
    .select('slug, updated_at')
  if (error) {
    console.error('[getProjectsForSitemap]', error)
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

export interface ProjectInput {
  slug: string
  title: string
  description: string
  category: ProjectCategory
  status: ProjectStatus
  nizam?: 'bitisik' | 'ayrik' | null
  location: string
  area: number
  floor_count: number
  unit_count?: number | null
  parking_floor_count?: number | null
  completion_date?: string | null
  start_date?: string | null
  apartment_types?: string[] | null
  client?: string | null
  architect?: string | null
  featured?: boolean
  specs?: unknown[]
  features?: unknown[]
  thumbnail_url?: string | null
  order_index?: number
}

export const createProject = async (
  input: ProjectInput,
): Promise<Project> => {
  const supabase = createSupabaseAdminClient()
  const { data, error } = await supabase
    .from('projects')
    .insert(input)
    .select('*, project_images(*)')
    .single()

  if (error) throw new Error(error.message)
  return mapProjectRow(data as ProjectRow)
}

export const updateProject = async (
  id: string,
  input: Partial<ProjectInput>,
): Promise<Project> => {
  const supabase = createSupabaseAdminClient()
  const { data, error } = await supabase
    .from('projects')
    .update(input)
    .eq('id', id)
    .select('*, project_images(*)')
    .single()

  if (error) throw new Error(error.message)
  return mapProjectRow(data as ProjectRow)
}

export const deleteProject = async (id: string): Promise<void> => {
  const supabase = createSupabaseAdminClient()

  // 1. Fetch image records so we can clean up storage files
  const { data: images } = await supabase
    .from('project_images')
    .select('url')
    .eq('project_id', id)

  // 2. Delete storage objects (best-effort)
  if (images && images.length > 0) {
    const paths = images
      .map((img: { url: string }) => extractStoragePath(img.url))
      .filter((p): p is string => !!p)
    if (paths.length > 0) {
      await supabase.storage.from('project-images').remove(paths)
    }
  }

  // 3. Delete project (cascades to project_images rows)
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

export const getProjectById = async (id: string): Promise<Project | null> => {
  const supabase = createSupabaseAdminClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*, project_images(*)')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    console.error('[getProjectById]', error)
    return null
  }
  return data ? mapProjectRow(data as ProjectRow) : null
}

export const getAllProjectsForAdmin = async (): Promise<Project[]> => {
  const supabase = createSupabaseAdminClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*, project_images(*)')
    .order('order_index', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[getAllProjectsForAdmin]', error)
    return []
  }
  return (data as ProjectRow[]).map(mapProjectRow)
}

// Extract storage path from public URL
// e.g. https://xxx.supabase.co/storage/v1/object/public/project-images/slug/file.jpg
//      → slug/file.jpg
export const extractStoragePath = (publicUrl: string): string | null => {
  const marker = '/project-images/'
  const idx = publicUrl.indexOf(marker)
  if (idx === -1) return null
  return publicUrl.slice(idx + marker.length)
}
