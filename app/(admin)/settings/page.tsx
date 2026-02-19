"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Save } from 'lucide-react'
import { toast } from 'sonner'
import { RestaurantInfo } from '@/lib/cms/types'

export default function SettingsPage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState<Record<string, string>>({
        name: '',
        description: '',
        address: '',
        phone: '',
        whatsapp: '',
        instagram: '',
        hours_week: '',
        hours_weekend: '',
        hours_sunday: ''
    })

    useEffect(() => {
        fetchSettings()
    }, [])

    async function fetchSettings() {
        try {
            const response = await fetch('/api/settings')
            const data: RestaurantInfo[] = await response.json()

            const settingsMap: Record<string, string> = {}
            data.forEach(item => {
                settingsMap[item.key] = item.value || ''
            })

            setFormData(prev => ({ ...prev, ...settingsMap }))
        } catch (error) {
            toast.error('Error al cargar configuración')
        } finally {
            setLoading(false)
        }
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        setSaving(true)

        try {
            const response = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                toast.success('Configuración actualizada correctamente')
            } else {
                toast.error('Error al actualizar configuración')
            }
        } catch (error) {
            toast.error('Error de conexión')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
                <p className="text-gray-600">Gestiona la información general del restaurante</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Información General</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nombre del Restaurante</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="instagram">Instagram (usuario)</Label>
                                <Input
                                    id="instagram"
                                    value={formData.instagram}
                                    onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                                    placeholder="ej: chavela.cocina"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Descripción Corta (SEO / Footer)</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                rows={2}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Contacto y Ubicación</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="address">Dirección</Label>
                            <Textarea
                                id="address"
                                value={formData.address}
                                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                                rows={2}
                                placeholder="Calle 123 #45-67..."
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Teléfono</Label>
                                <Input
                                    id="phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="whatsapp">WhatsApp (Link completo de wa.me o número)</Label>
                                <Input
                                    id="whatsapp"
                                    value={formData.whatsapp}
                                    onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                                    placeholder="https://wa.me/57300..."
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Horarios de Atención</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="hours_week">Lunes a Jueves</Label>
                                <Input
                                    id="hours_week"
                                    value={formData.hours_week}
                                    onChange={(e) => setFormData(prev => ({ ...prev, hours_week: e.target.value }))}
                                    placeholder="3:30 PM - 10:00 PM"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="hours_weekend">Viernes y Sábados</Label>
                                <Input
                                    id="hours_weekend"
                                    value={formData.hours_weekend}
                                    onChange={(e) => setFormData(prev => ({ ...prev, hours_weekend: e.target.value }))}
                                    placeholder="2:30 PM - 11:00 PM"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="hours_sunday">Domingos</Label>
                                <Input
                                    id="hours_sunday"
                                    value={formData.hours_sunday}
                                    onChange={(e) => setFormData(prev => ({ ...prev, hours_sunday: e.target.value }))}
                                    placeholder="3:30 PM - 10:00 PM"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button type="submit" disabled={saving} className="bg-orange-600 hover:bg-orange-700 h-12 px-8">
                        <Save className="h-4 w-4 mr-2" />
                        {saving ? 'Guardando...' : 'Guardar Cambios'}
                    </Button>
                </div>
            </form>
        </div>
    )
}
