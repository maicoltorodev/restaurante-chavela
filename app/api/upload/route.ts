import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyToken } from '@/lib/supabase/auth'
import { cookies } from 'next/headers'

// Cliente Supabase con Service Role Key (Bypass RLS)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
    }
})

export async function POST(request: NextRequest) {
    try {
        // 1. Verificar Autenticación de Admin
        const cookieStore = await cookies()
        const token = cookieStore.get('auth-token')?.value

        if (!token || !verifyToken(token)) {
            return NextResponse.json(
                { error: 'No autorizado' },
                { status: 401 }
            )
        }

        // 2. Procesar el FormData
        const formData = await request.formData()
        const file = formData.get('file') as File | null
        const path = formData.get('path') as string | null

        if (!file || !path) {
            return NextResponse.json(
                { error: 'Archivo y ruta requeridos' },
                { status: 400 }
            )
        }

        // 3. Subir a Supabase Storage (Bypass RLS)
        const { data, error } = await supabaseAdmin.storage
            .from('images')
            .upload(path, file, {
                contentType: file.type || 'image/webp',
                upsert: false
            })

        if (error) {
            console.error('Supabase upload error:', error)
            throw error
        }

        // 4. Obtener URL pública
        const { data: { publicUrl } } = supabaseAdmin.storage
            .from('images')
            .getPublicUrl(path)

        return NextResponse.json({ publicUrl })

    } catch (error: any) {
        console.error('Upload API error:', error)
        return NextResponse.json(
            { error: 'Error al subir la imagen: ' + (error.message || 'Error desconocido') },
            { status: 500 }
        )
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('auth-token')?.value

        if (!token || !verifyToken(token)) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
        }

        const body = await request.json()
        const { url } = body

        if (!url) {
            return NextResponse.json({ error: 'URL requerida' }, { status: 400 })
        }

        // Extraer el path relativo de la URL pública de Supabase
        // Formato: .../storage/v1/object/public/images/menu/archivo.webp
        const path = url.split('/images/').pop()

        if (!path) {
            return NextResponse.json({ error: 'Ruta no válida' }, { status: 400 })
        }

        const { error } = await supabaseAdmin.storage
            .from('images')
            .remove([path])

        if (error) throw error

        return NextResponse.json({ success: true })

    } catch (error: any) {
        console.error('Delete API error:', error)
        return NextResponse.json(
            { error: 'Error al eliminar la imagen' },
            { status: 500 }
        )
    }
}
