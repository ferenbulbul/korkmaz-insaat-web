import { NextResponse } from 'next/server'
import { updateProject } from '@/services/projects'

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const { id } = await params
  let body: { thumbnailUrl?: string | null }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Gecersiz istek' }, { status: 400 })
  }

  try {
    const project = await updateProject(id, {
      thumbnail_url: body.thumbnailUrl ?? null,
    })
    return NextResponse.json({ project })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Guncelleme basarisiz'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
