import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Server Supabase client — used in RSC, route handlers, server actions.
// Uses the anon key so RLS applies.
export const createSupabaseServerClient = async () => {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch {
            // RSC context where cookies are read-only; safe to ignore.
          }
        },
      },
    },
  )
}
