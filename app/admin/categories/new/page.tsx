"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Save, Loader2, Package } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

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
                order_index: parseInt(formData.order_index) || 0
            }

            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(categoryData),
            })

            if (response.ok) {
                toast.success('¡Sección creada con éxito!')
                router.push('/admin/categories')
            } else {
                const error = await response.json()
                toast.error(error.error || 'Error al crear la categoría')
            }
        } catch (error) {
            toast.error('Error de conexión')
        } finally {
            setLoading(true)
        }
    }

    return (
        <div className="space-y-8 max-w-4xl mx-auto pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/categories">
                        <Button variant="ghost" size="sm" className="h-12 w-12 rounded-full bg-white/5 border border-white/5 hover:bg-primary/20 hover:text-primary transition-all">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <div className="flex items-center gap-2 text-primary mb-1">
                            <Package className="h-3 w-3" />
                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Arquitectura de Carta</span>
                        </div>
                        <h1 className="text-4xl font-serif text-white">Nueva Categoría</h1>
                        <p className="text-muted-foreground text-sm mt-1">Defina una nueva sección para organizar sus creaciones</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Link href="/admin/categories" className="flex-1 md:flex-none">
                        <Button variant="ghost" className="w-full text-muted-foreground hover:text-white hover:bg-white/5 h-12 px-8 rounded-xl font-bold uppercase tracking-widest text-xs">
                            Descartar
                        </Button>
                    </Link>
                    <Button
                        onClick={onSubmit}
                        disabled={loading}
                        className="flex-1 md:flex-none bg-primary hover:bg-primary/90 text-white font-bold h-12 px-10 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95"
                    >
                        {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                        {loading ? 'Preparando...' : 'Crear Sección'}
                    </Button>
                </div>
            </div>

            <Card className="bg-[#14100f] border-white/5 shadow-2xl rounded-2xl overflow-hidden">
                <CardHeader className="p-8 border-b border-white/5 bg-black/20">
                    <CardTitle className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-bold">Parámetros de la Sección</CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <Label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Nombre Maestro *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="bg-black/20 border-white/5 h-12 focus-visible:ring-primary/40 text-white font-medium"
                                placeholder="Ej: Entradas, Cortes de Autor..."
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="order_index" className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Posición en la Carta</Label>
                            <Input
                                id="order_index"
                                type="number"
                                value={formData.order_index}
                                onChange={(e) => setFormData(prev => ({ ...prev, order_index: e.target.value }))}
                                className="bg-black/20 border-white/5 h-12 focus-visible:ring-primary/40 text-white font-medium"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="description" className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Descripción / Nota al Pie (Opcional)</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            rows={3}
                            className="bg-black/20 border-white/5 focus-visible:ring-primary/40 text-white resize-none py-4"
                            placeholder="Describa brevemente lo que el cliente encontrará en esta sección..."
                        />
                    </div>

                    <div className="flex items-center space-x-4 p-5 bg-primary/5 border border-primary/10 rounded-2xl transition-all hover:border-primary/30">
                        <input
                            type="checkbox"
                            id="is_active"
                            className="h-5 w-5 rounded border-white/10 bg-black/40 text-primary focus:ring-primary/40"
                            checked={formData.is_active}
                            onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                        />
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="is_active" className="text-sm font-bold text-white cursor-pointer select-none">Sección Visible</Label>
                            <span className="text-[10px] text-muted-foreground/60 uppercase tracking-widest">Activar para mostrar en el menú principal</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
