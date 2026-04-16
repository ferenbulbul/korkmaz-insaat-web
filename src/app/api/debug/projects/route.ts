import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'

// Diagnostic endpoint — compares what public (anon, RLS-filtered) vs admin
// (service_role, RLS-bypass) can see. Useful when admin-added projects
// don't appear on the public site.
export async function GET() {
  // 1. Public read (anon + RLS)
  const publicClient = await createSupabaseServerClient()
  const publicResult = await publicClient
    .from('projects')
    .select('id, slug, title, status, featured, created_at')

  // 2. Admin read (service_role, bypasses RLS)
  const adminClient = createSupabaseAdminClient()
  const adminResult = await adminClient
    .from('projects')
    .select('id, slug, title, status, featured, created_at')

  // 3. Image URLs — check what's actually stored in DB
  const imagesResult = await adminClient
    .from('project_images')
    .select('id, project_id, url, order_index')
    .order('created_at', { ascending: false })
    .limit(10)

  return NextResponse.json(
    {
      env: {
        hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        hasServiceRole: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        urlPreview: process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(0, 40),
      },
      public: {
        count: publicResult.data?.length ?? 0,
        error: publicResult.error
          ? {
              message: publicResult.error.message,
              code: publicResult.error.code,
              hint: publicResult.error.hint,
            }
          : null,
        rows: publicResult.data,
      },
      admin: {
        count: adminResult.data?.length ?? 0,
        error: adminResult.error
          ? {
              message: adminResult.error.message,
              code: adminResult.error.code,
            }
          : null,
        rows: adminResult.data,
      },
      images: {
        count: imagesResult.data?.length ?? 0,
        error: imagesResult.error
          ? { message: imagesResult.error.message, code: imagesResult.error.code }
          : null,
        rows: imagesResult.data,
      },
      diagnosis:
        publicResult.data?.length === 0 && (adminResult.data?.length ?? 0) > 0
          ? 'RLS_MISSING: projects tablosunda public SELECT policy eksik. Supabase SQL Editor\'da "Public projects read" policy\'sini ekleyin.'
          : publicResult.data?.length === adminResult.data?.length
            ? 'OK: Public ve admin ayni sonucu donuyor.'
            : 'UNKNOWN: Farkli bir durum var.',
    },
    { status: 200 },
  )
}
