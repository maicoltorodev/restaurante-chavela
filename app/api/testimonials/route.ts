import { NextRequest, NextResponse } from 'next/server'
import { getTestimonials, updateTestimonial, deleteTestimonial } from '@/lib/supabase/queries'
import { revalidateTag } from 'next/cache'

export const runtime = 'edge'

export async function GET() {
    try {
        const testimonials = await getTestimonials()
        return NextResponse.json(testimonials)
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener testimonios' }, { status: 500 })
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
