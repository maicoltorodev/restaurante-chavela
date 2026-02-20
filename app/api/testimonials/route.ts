import { NextRequest, NextResponse } from 'next/server'
import { getAdminTestimonials, createTestimonial, updateTestimonial, deleteTestimonial, cleanupTestimonials } from '@/lib/supabase/queries'
import { revalidateTag } from 'next/cache'
import { LRUCache } from 'lru-cache'

export const runtime = 'edge'

// Rate Limiter: Max 3 requests per IP per hour
const rateLimit = new LRUCache<string, number>({
    max: 500,
    ttl: 1000 * 60 * 60, // 1 hour
})

export async function GET() {
    try {
        const testimonials = await getAdminTestimonials()
        return NextResponse.json(testimonials)
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener testimonios' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        // 1. Rate Limiting Check
        const ip = request.headers.get('x-forwarded-for') || 'unknown'
        const currentUsage = rateLimit.get(ip) || 0

        if (currentUsage >= 3) {
            return NextResponse.json(
                { error: 'Has excedido el límite de envíos. Intenta más tarde.' },
                { status: 429 }
            )
        }

        rateLimit.set(ip, currentUsage + 1)

        const body = await request.json()
        const { customer_name, rating, comment, honeypot } = body // 'honeypot' campo trampa

        // 2. Honeypot Check (Anti-Bot)
        if (honeypot) {
            // Si el campo oculto tiene valor, es un bot.
            // Fingimos éxito pero no guardamos nada.
            return NextResponse.json({ success: true }, { status: 201 })
        }

        if (!customer_name || !rating || !comment) {
            return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 })
        }

        await createTestimonial({
            customer_name,
            rating: Number(rating),
            comment
        })

        // Limpiar BD después de insertar
        try {
            await cleanupTestimonials()
        } catch (cleanupError) {
            console.error('Error cleaning up testimonials:', cleanupError)
        }

        // Invalidate cache (para que el admin vea la nueva solicitud)
        revalidateTag('testimonials')

        return NextResponse.json({ success: true }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Error al crear testimonio' }, { status: 500 })
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json()
        const { id, ...data } = body
        const result = await updateTestimonial(id, data)

        // Invalidate cache
        revalidateTag('testimonials')

        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ error: 'Error al actualizar testimonio' }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })

    try {
        await deleteTestimonial(id)

        // Invalidate cache
        revalidateTag('testimonials')

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Error al eliminar testimonio' }, { status: 500 })
    }
}
