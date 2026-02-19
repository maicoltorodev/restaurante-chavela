"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { Category } from '@/lib/cms/types'

export default function EditCategoryPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        order_index: '0',
        is_active: true
    })

    useEffect(() => {
        fetchCategory()
    }, [])

    async function fetchCategory() {
        try {
            const response = await fetch(`/api/categories/${params.id}`)
            const data: Category = await response.json()

            if (response.ok) {
                setFormData({
                    name: data.name,
                    description: data.description || '',
                    order_index: data.order_index.toString(),
                    is_active: data.is_active
                })
            } else {
                toast.error('Error al cargar la categoría')
                router.push('/admin/categories')
            }
        } catch (error) {
            toast.error('Error de conexión')
        } finally {
            setLoading(false)
        }
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        setSaving(true)

        try {
            const categoryData = {
                ...formData,
                order_index: parseInt(formData.order_index)
            }

            const response = await fetch(`/api/categories/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(categoryData),
            })

            if (response.ok) {
                toast.success('Categoría actualizada correctamente')
                router.push('/admin/categories')
            } else {
                const error = await response.json()
                toast.error(error.error || 'Error al actualizar la categoría')
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
            <div className="flex items-center">
                <Link href="/admin/categories">
                    <Button variant="ghost" size="sm" className="mr-4">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Editar Categoría</h1>
                    <p className="text-gray-600">Modifica {formData.name}</p>
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
                            <Button type="submit" disabled={saving} className="bg-orange-600 hover:bg-orange-700">
                                <Save className="h-4 w-4 mr-2" />
                                {saving ? 'Guardando...' : 'Actualizar Categoría'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
