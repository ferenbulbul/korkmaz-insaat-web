import { NextResponse } from 'next/server'
import { uploadProjectImage } from '@/services/storage'
import { getProjectById, updateProject } from '@/services/projects'
import { reorderProjectImages } from '@/services/storage'

interface RouteContext {
  params: Promise<{ id: string }>
}

// Upload a new image
export async function POST(request: Request, { params }: RouteContext) {
  const { id } = await params

  const project = await getProjectById(id)
  if (!project) {
    return NextResponse.json({ error: 'Proje bulunamadi' }, { status: 404 })
  }

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

  const alt = formData.get('alt')
  const widthRaw = formData.get('width')
  const heightRaw = formData.get('height')

  try {
    const image = await uploadProjectImage({
      projectId: id,
      slug: project.slug,
      file,
      filename: file.name || 'image.jpg',
      alt: typeof alt === 'string' ? alt : undefined,
      width: typeof widthRaw === 'string' ? Number(widthRaw) : undefined,
      height: typeof heightRaw === 'string' ? Number(heightRaw) : undefined,
    })

    // If project has no thumbnail, set this image as thumbnail
    if (!project.thumbnailUrl) {
      await updateProject(id, { thumbnail_url: image.url })
    }

    return NextResponse.json({ image })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Yukleme basarisiz'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// Reorder images: body { orderedIds: string[] }
export async function PATCH(request: Request, { params }: RouteContext) {
  const { id } = await params
  let body: { orderedIds?: string[] }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Gecersiz istek' }, { status: 400 })
  }
  if (!Array.isArray(body.orderedIds)) {
    return NextResponse.json({ error: 'orderedIds gerekli' }, { status: 400 })
  }

  try {
    await reorderProjectImages(id, body.orderedIds)
    return NextResponse.json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Siralama basarisiz'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
