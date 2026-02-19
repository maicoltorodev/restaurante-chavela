"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { Category, MenuItem } from '@/lib/cms/types'
import { ImageUpload } from '@/components/admin/image-upload'

export default function EditMenuItemPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [categories, setCategories] = useState<Category[]>([])
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category_id: '',
        ingredients: '',
        image_url: '',
        tag: '',
        allergens: [] as string[],
        is_active: true
    })

    useEffect(() => {
        Promise.all([fetchCategories(), fetchMenuItem()])
    }, [])

    async function fetchCategories() {
        try {
            const response = await fetch('/api/categories')
            const data = await response.json()
            if (response.ok) setCategories(data)
        } catch (error) {
            toast.error('Error al cargar categorías')
        }
    }

    async function fetchMenuItem() {
        try {
            const response = await fetch(`/api/menu/${params.id}`)
            const data: MenuItem = await response.json()

            if (response.ok) {
                setFormData({
                    name: data.name,
                    description: data.description || '',
                    price: data.price.toString(),
                    category_id: data.category_id,
                    ingredients: data.ingredients?.join(', ') || '',
                    image_url: data.image_url || '',
                    tag: data.tag || '',
                    allergens: data.allergens || [],
                    is_active: data.is_active
                })
            } else {
                toast.error('Error al cargar el platillo')
                router.push('/admin/menu')
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
            const menuItemData = {
                ...formData,
                price: parseFloat(formData.price),
                ingredients: formData.ingredients.split(',').map(i => i.trim()).filter(Boolean),
                tag: formData.tag || null
            }

            const response = await fetch(`/api/menu/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(menuItemData),
            })

            if (response.ok) {
                toast.success('Platillo actualizado correctamente')
                router.push('/admin/menu')
            } else {
                const error = await response.json()
                toast.error(error.error || 'Error al actualizar el platillo')
            }
        } catch (error) {
            toast.error('Error de conexión')
        } finally {
            setSaving(false)
        }
    }

    const allergenOptions = ['gluten', 'lacteos', 'huevo', 'mariscos', 'frutos secos']

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
                <Link href="/admin/menu">
                    <Button variant="ghost" size="sm" className="mr-4">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Editar Platillo</h1>
                    <p className="text-gray-600">Modifica la información de {formData.name}</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Información del Platillo</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nombre del Platillo *</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="price">Precio *</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Categoría *</Label>
                                <Select value={formData.category_id} onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona una categoría" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label>Imagen del Platillo</Label>
                                <ImageUpload
                                    value={formData.image_url}
                                    onChange={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
                                    onRemove={() => setFormData(prev => ({ ...prev, image_url: '' }))}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tag">Etiqueta (Tag)</Label>
                                <Input
                                    id="tag"
                                    value={formData.tag}
                                    onChange={(e) => setFormData(prev => ({ ...prev, tag: e.target.value }))}
                                    placeholder="Ej: 3 Unidades, Especial, Picante"
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

                        <div className="space-y-2">
                            <Label htmlFor="ingredients">Ingredientes (separados por comas)</Label>
                            <Textarea
                                id="ingredients"
                                value={formData.ingredients}
                                onChange={(e) => setFormData(prev => ({ ...prev, ingredients: e.target.value }))}
                                rows={2}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Alérgenos</Label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {allergenOptions.map((allergen) => (
                                    <div key={allergen} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={allergen}
                                            checked={formData.allergens.includes(allergen)}
                                            onCheckedChange={(checked) => {
                                                if (checked) {
                                                    setFormData(prev => ({ ...prev, allergens: [...prev.allergens, allergen] }))
                                                } else {
                                                    setFormData(prev => ({ ...prev, allergens: prev.allergens.filter(a => a !== allergen) }))
                                                }
                                            }}
                                        />
                                        <Label htmlFor={allergen} className="text-sm">
                                            {allergen.charAt(0).toUpperCase() + allergen.slice(1)}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="is_active"
                                checked={formData.is_active}
                                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: !!checked }))}
                            />
                            <Label htmlFor="is_active">Platillo activo</Label>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Link href="/admin/menu">
                                <Button variant="outline" type="button">Cancelar</Button>
                            </Link>
                            <Button type="submit" disabled={saving} className="bg-orange-600 hover:bg-orange-700">
                                <Save className="h-4 w-4 mr-2" />
                                {saving ? 'Guardando...' : 'Actualizar Platillo'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
