import { createBrowserClient } from '@supabase/ssr'

// Browser Supabase client (uses anon key, RLS-protected)
export const createSupabaseBrowserClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
