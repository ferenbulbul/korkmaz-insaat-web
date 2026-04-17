import { NextResponse } from 'next/server'
import { updateBlogPost, deleteBlogPost } from '@/services/blog'
import type { BlogPostInput } from '@/types/blog'

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const { id } = await params
  let body: Partial<BlogPostInput>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Gecersiz istek' }, { status: 400 })
  }

  try {
    const post = await updateBlogPost(id, body)
    return NextResponse.json({ post })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Guncelleme basarisiz'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const { id } = await params

  try {
    await deleteBlogPost(id)
    return NextResponse.json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Silme basarisiz'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
