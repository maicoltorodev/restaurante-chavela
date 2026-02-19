import { NextRequest, NextResponse } from 'next/server'
import { getMenuItems, createMenuItem } from '@/lib/supabase/queries'
import { menuItemSchema } from '@/lib/cms/validations'

export const runtime = 'edge'

export async function GET() {
  try {
    const menuItems = await getMenuItems()
    return NextResponse.json(menuItems)
  } catch (error) {
    console.error('Error fetching menu items:', error)
    return NextResponse.json(
      { error: 'Error al obtener los platillos' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar con Zod
    const validation = menuItemSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Datos no válidos', details: validation.error.format() },
        { status: 400 }
      )
    }

    const menuItem = await createMenuItem(validation.data)
    return NextResponse.json(menuItem, { status: 201 })
  } catch (error) {
    console.error('Error creating menu item:', error)
    return NextResponse.json(
      { error: 'Error al crear el platillo' },
      { status: 500 }
    )
  }
}
