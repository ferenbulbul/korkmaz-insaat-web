import { NextResponse } from 'next/server'
import { createProject, type ProjectInput } from '@/services/projects'
import { slugify } from '@/lib/utils'

export async function POST(request: Request) {
  let body: Partial<ProjectInput & { slug?: string }>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Gecersiz istek' }, { status: 400 })
  }

  // Basic required-field validation
  const required: (keyof ProjectInput)[] = [
    'title',
    'description',
    'category',
    'status',
    'location',
    'area',
    'floor_count',
  ]
  for (const key of required) {
    if (body[key] === undefined || body[key] === null || body[key] === '') {
      return NextResponse.json(
        { error: `Zorunlu alan eksik: ${String(key)}` },
        { status: 400 },
      )
    }
  }

  // Auto-generate slug if not provided
  const slug = body.slug?.trim() || slugify(body.title!)

  try {
    const project = await createProject({
      ...(body as ProjectInput),
      slug,
    })
    return NextResponse.json({ project })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Proje olusturulamadi'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
