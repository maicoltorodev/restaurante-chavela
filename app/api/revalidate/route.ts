import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { path, tag } = body

    // Validar que la solicitud venga de Supabase
    const authHeader = request.headers.get('authorization')
    const supabaseSecret = process.env.SUPABASE_WEBHOOK_SECRET
    
    if (authHeader !== `Bearer ${supabaseSecret}`) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    // Revalidar paths específicos
    if (path) {
      revalidatePath(path)
    }

    // Revalidar por tags
    if (tag) {
      revalidateTag(tag)
    }

    // Revalidar paths principales
    revalidatePath('/')
    revalidatePath('/menu')
    revalidatePath('/admin/menu')

    return NextResponse.json({ 
      success: true, 
      message: 'Cache revalidado correctamente',
      revalidated: new Date().toISOString()
    })

  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { error: 'Error al revalidar caché' },
      { status: 500 }
    )
  }
}
