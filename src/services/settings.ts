import 'server-only'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'

const BLOG_VISIBLE_KEY = 'blog_visible'

// ============================================================
// PUBLIC READS — server client (anon key, RLS applies)
// ============================================================

// Defaults to true so the site keeps working if the settings
// table doesn't exist yet or the query fails.
export const getBlogVisible = async (): Promise<boolean> => {
  try {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', BLOG_VISIBLE_KEY)
      .maybeSingle()

    if (error) {
      console.error('[getBlogVisible]', error.message)
      return true
    }
    return data ? data.value !== false : true
  } catch {
    return true
  }
}

// Cookieless variant for static contexts (sitemap, robots).
export const getBlogVisibleForStatic = async (): Promise<boolean> => {
  try {
    const supabase = createSupabaseAdminClient()
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', BLOG_VISIBLE_KEY)
      .maybeSingle()

    if (error) {
      console.error('[getBlogVisibleForStatic]', error.message)
      return true
    }
    return data ? data.value !== false : true
  } catch {
    return true
  }
}

// ============================================================
// ADMIN WRITES — service_role client (bypasses RLS)
// ============================================================

export const setBlogVisible = async (visible: boolean): Promise<void> => {
  const supabase = createSupabaseAdminClient()
  const { error } = await supabase.from('site_settings').upsert({
    key: BLOG_VISIBLE_KEY,
    value: visible,
    updated_at: new Date().toISOString(),
  })
  if (error) throw new Error(error.message)
}
