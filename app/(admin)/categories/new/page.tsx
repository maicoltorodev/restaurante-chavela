"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function NewCategoryPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        order_index: '0',
        is_active: true
    })

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)

        try {
            const categoryData = {
                ...formData,
                order_index: parseInt(formData.order_index)
            }

            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(categoryData),
            })

            if (response.ok) {
                toast.success('Categoría creada correctamente')
                router.push('/admin/categories')
            } else {
                const error = await response.json()
                toast.error(error.error || 'Error al crear la categoría')
            }
        } catch (error) {
            toast.error('Error de conexión')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center">
                <Link href="/admin/categories">
                    <Button variant="ghost" size="sm" className="mr-4">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Nueva Categoría</h1>
                    <p className="text-gray-600">Agrega una nueva sección al menú</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Información de la Categoría</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nombre *</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    required
                                    placeholder="Ej: Plato Fuerte"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="order_index">Orden de aparición</Label>
                                <Input
                                    id="order_index"
                                    type="number"
                                    value={formData.order_index}
                                    onChange={(e) => setFormData(prev => ({ ...prev, order_index: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Descripción</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Breve descripción de la categoría..."
                                rows={3}
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="is_active"
                                className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                checked={formData.is_active}
                                onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                            />
                            <Label htmlFor="is_active">Categoría activa</Label>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Link href="/admin/categories">
                                <Button variant="outline" type="button">Cancelar</Button>
                            </Link>
                            <Button type="submit" disabled={loading} className="bg-orange-600 hover:bg-orange-700">
                                <Save className="h-4 w-4 mr-2" />
                                {loading ? 'Guardando...' : 'Guardar Categoría'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
