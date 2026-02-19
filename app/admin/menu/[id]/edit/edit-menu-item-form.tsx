"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Save, Loader2, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { Category, MenuItem } from '@/lib/cms/types'
import { ImageUpload } from '@/components/admin/image-upload'

interface EditMenuItemFormProps {
    menuItem: MenuItem
    categories: Category[]
}

export default function EditMenuItemForm({ menuItem, categories }: EditMenuItemFormProps) {
    const router = useRouter()
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        name: menuItem.name,
        description: menuItem.description || '',
        price: menuItem.price.toString(),
        category_id: menuItem.category_id,
        ingredients: menuItem.ingredients?.join(', ') || '',
        image_url: menuItem.image_url || '',
        tag: menuItem.tag || '',
        allergens: menuItem.allergens || [],
        is_active: menuItem.is_active
    })

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

            const response = await fetch(`/api/menu/${menuItem.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(menuItemData),
            })

            if (response.ok) {
                toast.success('¡Platillo actualizado, Chef!')
                router.push('/admin/menu')
            } else {
                const error = await response.json()
                toast.error(error.error || 'Error al actualizar')
            }
        } catch (error) {
            toast.error('Error de conexión')
        } finally {
            setSaving(false)
        }
    }

    const allergenOptions = ['gluten', 'lacteos', 'huevo', 'mariscos', 'frutos secos']

    return (
        <form onSubmit={onSubmit} className="space-y-8 max-w-5xl mx-auto pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/menu">
                        <Button variant="ghost" type="button" size="sm" className="h-12 w-12 rounded-full bg-white/5 border border-white/5 hover:bg-primary/20 hover:text-primary transition-all">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <div className="flex items-center gap-2 text-primary mb-1">
                            <Sparkles className="h-3 w-3" />
                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Edición de Autor</span>
                        </div>
                        <h1 className="text-4xl font-serif text-white">Editar Platillo</h1>
                        <p className="text-muted-foreground text-sm mt-1">Perfeccione la receta de {formData.name}</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Link href="/admin/menu" className="flex-1 md:flex-none">
                        <Button variant="ghost" type="button" className="w-full text-muted-foreground hover:text-white hover:bg-white/5 h-12 px-8 rounded-xl font-bold uppercase tracking-widest text-xs">
                            Cancelar
                        </Button>
                    </Link>
                    <Button
                        type="submit"
                        disabled={saving}
                        className="flex-1 md:flex-none bg-primary hover:bg-primary/90 text-white font-bold h-12 px-10 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95"
                    >
                        {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                        {saving ? 'Guardando...' : 'Guardar Cambios'}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
                <Card className="bg-[#14100f] border-white/5 shadow-2xl rounded-2xl overflow-hidden">
                    <CardHeader className="p-8 border-b border-white/5 bg-black/20 text-white">
                        <CardTitle className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-bold">Esencia y Detalles</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8 text-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <Label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Nombre del Platillo *</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    className="bg-black/20 border-white/5 h-12 focus-visible:ring-primary/40 text-white font-medium"
                                    required
                                />
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="price" className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Precio (COP) *</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                                    className="bg-black/20 border-white/5 h-12 focus-visible:ring-primary/40 text-white font-medium"
                                    required
                                />
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="category" className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Categoría *</Label>
                                <Select value={formData.category_id} onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}>
                                    <SelectTrigger className="bg-black/20 border-white/5 h-12 focus:ring-primary/40 text-white">
                                        <SelectValue placeholder="Selecciona una sección" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#14100f] border-white/10 text-white">
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id} className="focus:bg-primary/20 focus:text-primary">
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="tag" className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Etiqueta Especial (Tag)</Label>
                                <Input
                                    id="tag"
                                    value={formData.tag}
                                    onChange={(e) => setFormData(prev => ({ ...prev, tag: e.target.value }))}
                                    className="bg-black/20 border-white/5 h-12 focus-visible:ring-primary/40 text-white"
                                    placeholder="Ej: Recomendado del Chef"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="description" className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Inspiración / Descripción</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                rows={3}
                                className="bg-black/20 border-white/5 focus-visible:ring-primary/40 text-white resize-none py-4"
                            />
                        </div>

                        <div className="space-y-4">
                            <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Presentación Visual</Label>
                            <div className="p-6 bg-black/20 border border-dashed border-white/10 rounded-2xl">
                                <ImageUpload
                                    value={formData.image_url}
                                    onChange={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
                                    onRemove={() => setFormData(prev => ({ ...prev, image_url: '' }))}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#14100f] border-white/5 shadow-2xl rounded-2xl overflow-hidden text-white">
                    <CardHeader className="p-8 border-b border-white/5 bg-black/20">
                        <CardTitle className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground">Composición e Ingredientes</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                        <div className="space-y-3">
                            <Label htmlFor="ingredients" className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Ingredientes Clave (separados por comas)</Label>
                            <Textarea
                                id="ingredients"
                                value={formData.ingredients}
                                onChange={(e) => setFormData(prev => ({ ...prev, ingredients: e.target.value }))}
                                rows={2}
                                className="bg-black/20 border-white/5 focus-visible:ring-primary/40 text-white resize-none py-4"
                            />
                        </div>

                        <div className="space-y-4">
                            <Label className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Presencia de Alérgenos</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {allergenOptions.map((allergen) => (
                                    <div key={allergen} className="group flex items-center space-x-3 p-3 bg-black/20 border border-white/5 rounded-xl hover:bg-primary/5 hover:border-primary/20 transition-all">
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
                                            className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                        />
                                        <Label htmlFor={allergen} className="text-xs uppercase tracking-widest font-bold cursor-pointer transition-colors group-hover:text-primary">
                                            {allergen}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                            <Checkbox
                                id="is_active"
                                checked={formData.is_active}
                                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: !!checked }))}
                                className="border-primary/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                            <div className="flex flex-col">
                                <Label htmlFor="is_active" className="text-sm font-bold text-white cursor-pointer">Disponibilidad Inmediata</Label>
                                <span className="text-[10px] text-primary/60 font-medium font-sans">Si se desactiva, el plato dejará de aparecer en la carta web.</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </form>
    )
}
