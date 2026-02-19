import { NextRequest, NextResponse } from 'next/server'
import { updateMenuItem, deleteMenuItem, getMenuItemById } from '@/lib/supabase/queries'
import { menuItemSchema } from '@/lib/cms/validations'

export const runtime = 'edge'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const menuItem = await getMenuItemById(params.id)
    return NextResponse.json(menuItem)
  } catch (error) {
    console.error('Error fetching menu item:', error)
    return NextResponse.json(
      { error: 'Error al obtener el platillo' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    // Validar parcialmente con Zod
    const validation = menuItemSchema.partial().safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Datos no válidos', details: validation.error.format() },
        { status: 400 }
      )
    }

    const menuItem = await updateMenuItem(params.id, validation.data)
    return NextResponse.json(menuItem)
  } catch (error) {
    console.error('Error updating menu item:', error)
    return NextResponse.json(
      { error: 'Error al actualizar el platillo' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteMenuItem(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting menu item:', error)
    return NextResponse.json(
      { error: 'Error al eliminar el platillo' },
      { status: 500 }
    )
  }
}
