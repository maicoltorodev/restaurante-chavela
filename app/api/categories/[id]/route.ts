import { NextRequest, NextResponse } from 'next/server'
import { updateCategory, deleteCategory, getCategoryById, getAdminCategoryById } from '@/lib/supabase/queries'
import { categorySchema } from '@/lib/cms/validations'
import { revalidateTag } from 'next/cache'

export const runtime = 'edge'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const category = await getAdminCategoryById(id)
        return NextResponse.json(category)
    } catch (error) {
        console.error('Error fetching category:', error)
        return NextResponse.json(
            { error: 'Error al obtener la categoría' },
            { status: 500 }
        )
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()
        const validation = categorySchema.partial().safeParse(body)
        if (!validation.success) {
            return NextResponse.json(
                { error: 'Datos no válidos', details: validation.error.format() },
                { status: 400 }
            )
        }

        const category = await updateCategory(id, validation.data)

        // Invalidate cache
        revalidateTag('categories')
        revalidateTag('menu-items')

        return NextResponse.json(category)
    } catch (error) {
        console.error('Error updating category:', error)
        return NextResponse.json(
            { error: 'Error al actualizar la categoría' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        await deleteCategory(id)

        // Invalidate cache
        revalidateTag('categories')
        revalidateTag('menu-items')

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting category:', error)
        return NextResponse.json(
            { error: 'Error al eliminar la categoría' },
            { status: 500 }
        )
    }
}
