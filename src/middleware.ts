import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE, verifyAdminSession } from '@/lib/auth/session'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public admin endpoints (login form + login API + logout API)
  const isLogin =
    pathname === '/admin/login' ||
    pathname === '/api/admin/auth/login' ||
    pathname === '/api/admin/auth/logout'

  if (isLogin) return NextResponse.next()

  const token = request.cookies.get(SESSION_COOKIE)?.value
  const session = await verifyAdminSession(token)

  if (!session) {
    // Protected /admin/* → redirect to login
    if (pathname.startsWith('/admin')) {
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
    // Protected /api/admin/* → 401 JSON
    return NextResponse.json(
      { error: 'Yetkisiz erisim' },
      { status: 401 },
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
