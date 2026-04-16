import 'server-only'
import { createClient } from '@supabase/supabase-js'

// Admin Supabase client — uses service_role key which bypasses RLS.
// NEVER import this from a client component. Only used in admin route handlers.
export const createSupabaseAdminClient = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  )
