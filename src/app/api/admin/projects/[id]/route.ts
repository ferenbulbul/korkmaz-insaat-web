import { NextResponse } from 'next/server'
import { updateProject, deleteProject, type ProjectInput } from '@/services/projects'

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const { id } = await params
  let body: Partial<ProjectInput>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Gecersiz istek' }, { status: 400 })
  }

  try {
    const project = await updateProject(id, body)
    return NextResponse.json({ project })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Guncelleme basarisiz'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const { id } = await params

  try {
    await deleteProject(id)
    return NextResponse.json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Silme basarisiz'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
