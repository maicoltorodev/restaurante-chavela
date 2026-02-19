import { NextRequest, NextResponse } from 'next/server'
import { getRestaurantInfo, updateRestaurantInfo } from '@/lib/supabase/queries'
import { revalidateTag } from 'next/cache'

export const runtime = 'edge'

export async function GET() {
    try {
        const info = await getRestaurantInfo()
        return NextResponse.json(info)
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener configuración' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const body: Record<string, string | null> = await request.json()

        // Actualizar cada llave en paralelo
        await Promise.all(
            Object.entries(body).map(([key, value]) => updateRestaurantInfo(key, value))
        )

        // Invalidate cache
        revalidateTag('restaurant-info')

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error updating settings:', error)
        return NextResponse.json({ error: 'Error al actualizar configuración' }, { status: 500 })
    }
}
