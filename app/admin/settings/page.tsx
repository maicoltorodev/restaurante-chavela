import React from 'react'
import { getRestaurantInfo } from '@/lib/supabase/queries'
import SettingsForm from './settings-form'

export default async function SettingsPage() {
    // Carga de datos directamente en el servidor
    const restaurantInfo = await getRestaurantInfo()

    // Normalizar datos para el formulario
    const settingsMap: Record<string, string> = {}
    restaurantInfo.forEach(item => {
        settingsMap[item.key] = item.value || ''
    })

    return (
        <div className="max-w-5xl mx-auto">
            <SettingsForm initialData={settingsMap} />
        </div>
    )
}
