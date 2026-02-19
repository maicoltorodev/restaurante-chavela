import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/supabase/auth'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Si está intentando acceder a rutas de admin
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const payload = verifyToken(token)

    if (!payload) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Si está en login y ya está autenticado, redirigir a admin
  if (pathname === '/login') {
    const token = request.cookies.get('auth-token')?.value

    if (token && verifyToken(token)) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/login']
}
