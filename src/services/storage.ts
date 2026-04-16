import 'server-only'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { extractStoragePath } from '@/services/projects'
import type { ProjectImage } from '@/types/project'

const BUCKET = 'project-images'

// ============================================================
// IMAGE UPLOAD
// ============================================================

export interface UploadProjectImageInput {
  projectId: string
  slug: string
  file: File | Blob
  filename: string
  alt?: string
  width?: number
  height?: number
}

export const uploadProjectImage = async (
  input: UploadProjectImageInput,
): Promise<ProjectImage> => {
  const supabase = createSupabaseAdminClient()

  // 1. Calculate next order_index
  const { data: existing } = await supabase
    .from('project_images')
    .select('order_index')
    .eq('project_id', input.projectId)
    .order('order_index', { ascending: false })
    .limit(1)

  const nextOrderIndex =
    existing && existing.length > 0 ? existing[0].order_index + 1 : 0

  // 2. Build unique storage path: <slug>/<timestamp>-<filename>
  const ext = input.filename.split('.').pop() || 'jpg'
  const safeName = input.filename
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-zA-Z0-9-_]/g, '-')
    .toLowerCase()
    .slice(0, 40)
  const storagePath = `${input.slug}/${Date.now()}-${safeName}.${ext}`

  // 3. Upload to storage
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, input.file, {
      cacheControl: '3600',
      upsert: false,
      contentType: input.file instanceof File ? input.file.type : undefined,
    })

  if (uploadError) throw new Error(uploadError.message)

  // 4. Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(storagePath)

  // 5. Insert DB row
  const { data: inserted, error: insertError } = await supabase
    .from('project_images')
    .insert({
      project_id: input.projectId,
      url: publicUrl,
      alt: input.alt ?? null,
      width: input.width ?? null,
      height: input.height ?? null,
      order_index: nextOrderIndex,
    })
    .select()
    .single()

  if (insertError) {
    // Clean up storage if DB insert failed
    await supabase.storage.from(BUCKET).remove([storagePath])
    throw new Error(insertError.message)
  }

  return {
    id: inserted.id,
    url: inserted.url,
    alt: inserted.alt ?? '',
    width: inserted.width,
    height: inserted.height,
  }
}

// ============================================================
// IMAGE DELETE
// ============================================================

export const deleteProjectImage = async (imageId: string): Promise<void> => {
  const supabase = createSupabaseAdminClient()

  // 1. Fetch row to get URL
  const { data: img, error: fetchError } = await supabase
    .from('project_images')
    .select('url')
    .eq('id', imageId)
    .maybeSingle()

  if (fetchError) {
    console.error('[deleteProjectImage] fetch error:', fetchError)
    throw new Error(fetchError.message)
  }
  if (!img) throw new Error('Gorsel bulunamadi')

  // 2. Remove storage object (best-effort)
  const storagePath = extractStoragePath(img.url)
  if (storagePath) {
    const { error: storageError } = await supabase.storage
      .from(BUCKET)
      .remove([storagePath])
    if (storageError) {
      // Log but do not block DB deletion — storage file may already be gone.
      console.warn('[deleteProjectImage] storage remove warning:', storageError)
    }
  }

  // 3. Delete DB row
  const { error: deleteError } = await supabase
    .from('project_images')
    .delete()
    .eq('id', imageId)

  if (deleteError) {
    console.error('[deleteProjectImage] delete error:', deleteError)
    throw new Error(deleteError.message)
  }
}

// ============================================================
// IMAGE REORDER
// ============================================================

export const reorderProjectImages = async (
  projectId: string,
  orderedIds: string[],
): Promise<void> => {
  const supabase = createSupabaseAdminClient()

  // Update each row's order_index based on position in array
  const updates = orderedIds.map((id, index) =>
    supabase
      .from('project_images')
      .update({ order_index: index })
      .eq('id', id)
      .eq('project_id', projectId),
  )

  const results = await Promise.all(updates)
  const firstErr = results.find((r) => r.error)?.error
  if (firstErr) throw new Error(firstErr.message)
}
