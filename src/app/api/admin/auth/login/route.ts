import { NextResponse } from 'next/server'
import { signAdminSession, SESSION_COOKIE, SESSION_MAX_AGE } from '@/lib/auth/session'

export async function POST(request: Request) {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) {
    return NextResponse.json(
      { error: 'Admin sifresi yapilandirilmamis' },
      { status: 500 },
    )
  }

  let body: { password?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Gecersiz istek' }, { status: 400 })
  }

  if (!body.password || body.password !== expected) {
    return NextResponse.json(
      { error: 'Sifre hatali' },
      { status: 401 },
    )
  }

  const token = await signAdminSession()
  const response = NextResponse.json({ success: true })
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  })
  return response
}
