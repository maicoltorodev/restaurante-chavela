import { NextRequest, NextResponse } from 'next/server'
import { getAdminUser, verifyPassword, createToken } from '@/lib/supabase/auth'
import { LRUCache } from 'lru-cache'

// Rate limiter: max 5 intentos por IP cada 15 minutos
const rateLimit = new LRUCache<string, number>({
  max: 500,
  ttl: 1000 * 60 * 15,
})

export async function POST(request: NextRequest) {
  try {
    // Obtener IP del cliente
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const attempts = rateLimit.get(ip) || 0

    if (attempts >= 5) {
      return NextResponse.json(
        { error: 'Demasiados intentos. Intenta de nuevo en 15 minutos.' },
        { status: 429 }
      )
    }

    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Usuario y contraseña son requeridos' },
        { status: 400 }
      )
    }

    const { data: user, error } = await getAdminUser(username)

    if (error || !user) {
      rateLimit.set(ip, attempts + 1)
      return NextResponse.json(
        { error: 'Credenciales incorrectas' },
        { status: 401 }
      )
    }

    const isValidPassword = await verifyPassword(password, user.password_hash)

    if (!isValidPassword) {
      rateLimit.set(ip, attempts + 1)
      return NextResponse.json(
        { error: 'Credenciales incorrectas' },
        { status: 401 }
      )
    }

    // Reset attempts on successful login
    rateLimit.delete(ip)

    const token = createToken(user.id)

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    })

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 8 * 60 * 60, // 8 hours
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Error del servidor' },
      { status: 500 }
    )
  }
}
