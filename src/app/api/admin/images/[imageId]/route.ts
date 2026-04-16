import { NextResponse } from 'next/server'
import { deleteProjectImage } from '@/services/storage'

interface RouteContext {
  params: Promise<{ imageId: string }>
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const { imageId } = await params

  try {
    await deleteProjectImage(imageId)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[DELETE /api/admin/images/:imageId] error:', {
      imageId,
      message: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
    })
    const message = err instanceof Error ? err.message : 'Silme basarisiz'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
