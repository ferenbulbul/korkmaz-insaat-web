import { NextResponse } from 'next/server'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'

const BUCKET = 'blog-images'

export async function POST(request: Request) {
  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Gecersiz istek' }, { status: 400 })
  }

  const file = formData.get('file')
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Dosya bulunamadi' }, { status: 400 })
  }

  const supabase = createSupabaseAdminClient()

  // Build unique storage path
  const ext = file.name.split('.').pop() || 'jpg'
  const safeName = file.name
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-zA-Z0-9-_]/g, '-')
    .toLowerCase()
    .slice(0, 40)
  const storagePath = `${Date.now()}-${safeName}.${ext}`

  // Upload to storage
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    })

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 })
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(storagePath)

  return NextResponse.json({ url: publicUrl })
}
