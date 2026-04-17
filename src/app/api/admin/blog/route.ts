import { NextResponse } from 'next/server'
import { createBlogPost } from '@/services/blog'
import type { BlogPostInput } from '@/types/blog'
import { slugify } from '@/lib/utils'

export async function POST(request: Request) {
  let body: Partial<BlogPostInput & { slug?: string }>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Gecersiz istek' }, { status: 400 })
  }

  // Basic required-field validation
  const required: (keyof BlogPostInput)[] = ['title', 'excerpt', 'content']
  for (const key of required) {
    if (body[key] === undefined || body[key] === null || body[key] === '') {
      return NextResponse.json(
        { error: `Zorunlu alan eksik: ${String(key)}` },
        { status: 400 },
      )
    }
  }

  const slug = body.slug?.trim() || slugify(body.title!)

  try {
    const post = await createBlogPost({
      ...(body as BlogPostInput),
      slug,
    })
    return NextResponse.json({ post })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Yazi olusturulamadi'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
