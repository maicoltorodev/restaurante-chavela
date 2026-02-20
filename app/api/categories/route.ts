import { NextRequest, NextResponse } from 'next/server'
import { getCategories, createCategory, getAdminCategories } from '@/lib/supabase/queries'
import { categorySchema } from '@/lib/cms/validations'

import { revalidateTag } from 'next/cache'

export const runtime = 'edge'

export async function GET() {
  try {
    const categories = await getAdminCategories()
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Error al obtener las categorías' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar con Zod
    const validation = categorySchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Datos no válidos', details: validation.error.format() },
        { status: 400 }
      )
    }

    const categoryData = {
      ...validation.data,
      description: validation.data.description || null
    }

    const category = await createCategory(categoryData)

    // Invalidate cache
    revalidateTag('categories')
    revalidateTag('menu-items')

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { error: 'Error al crear la categoría' },
      { status: 500 }
    )
  }
}
