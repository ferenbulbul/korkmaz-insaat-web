import { NextResponse } from 'next/server'
import { getBlogVisible, setBlogVisible } from '@/services/settings'

export async function GET() {
  const blogVisible = await getBlogVisible()
  return NextResponse.json({ blogVisible })
}

export async function PATCH(request: Request) {
  let body: { blogVisible?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Gecersiz istek' }, { status: 400 })
  }

  if (typeof body.blogVisible !== 'boolean') {
    return NextResponse.json(
      { error: 'blogVisible alani boolean olmali' },
      { status: 400 },
    )
  }

  try {
    await setBlogVisible(body.blogVisible)
    return NextResponse.json({ blogVisible: body.blogVisible })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Ayar kaydedilemedi'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
