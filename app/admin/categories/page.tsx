"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { Category } from '@/lib/cms/types'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Package as PackageIcon } from 'lucide-react'

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCategories()
    }, [])

    async function fetchCategories() {
        try {
            const response = await fetch('/api/categories')
            const data = await response.json()
            if (response.ok) setCategories(data)
        } catch (error) {
            toast.error('Error al cargar categorías')
        } finally {
            setLoading(false)
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('¿Estás seguro? Esto podría afectar a los platillos vinculados.')) return
        try {
            const response = await fetch(`/api/categories/${id}`, { method: 'DELETE' })
            if (response.ok) {
                toast.success('Categoría eliminada')
                fetchCategories()
            }
        } catch (error) {
            toast.error('Error al eliminar')
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-white">Categorías</h1>
                    <p className="text-muted-foreground text-sm">Gestiona las secciones del menú de Chavela</p>
                </div>
                <Link href="/admin/categories/new">
                    <Button className="bg-primary hover:bg-primary/90 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95">
                        <Plus className="mr-2 h-4 w-4" />
                        Nueva Categoría
                    </Button>
                </Link>
            </div>

            <div className="bg-[#14100f] rounded-2xl border border-white/5 shadow-2xl overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-muted-foreground animate-pulse">Cargando secciones...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 bg-black/40">
                                    <th className="px-8 py-6 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Nombre de Sección</th>
                                    <th className="px-8 py-6 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Orden</th>
                                    <th className="px-8 py-6 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Estado</th>
                                    <th className="px-8 py-6 text-right text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {categories.map((cat) => (
                                    <tr key={cat.id} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="px-8 py-6 whitespace-nowrap">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 bg-primary/5 rounded-xl flex items-center justify-center border border-white/5 group-hover:border-primary/20 transition-all">
                                                    <PackageIcon className="h-5 w-5 text-primary/40 group-hover:text-primary transition-colors" />
                                                </div>
                                                <span className="text-sm font-bold text-white group-hover:text-primary transition-colors italic font-serif tracking-tight">{cat.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 whitespace-nowrap">
                                            <span className="text-sm font-bold text-white bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 inline-flex items-center justify-center">
                                                #{cat.order_index}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 whitespace-nowrap">
                                            <div
                                                className={cn(
                                                    "flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full w-fit",
                                                    cat.is_active ? "text-green-500 bg-green-500/10" : "text-muted-foreground/40 bg-white/5"
                                                )}
                                            >
                                                <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", cat.is_active ? "bg-green-500 animate-pulse" : "bg-muted-foreground/20")}></span>
                                                {cat.is_active ? 'Activa' : 'Inactiva'}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 whitespace-nowrap text-right">
                                            <div className="flex justify-end gap-3 opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                                                <Link href={`/admin/categories/${cat.id}/edit`}>
                                                    <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl bg-white/5 hover:bg-primary/20 hover:text-primary transition-all active:scale-90">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(cat.id)}
                                                    className="h-10 w-10 p-0 rounded-xl bg-white/5 hover:bg-destructive/20 hover:text-destructive transition-all active:scale-90"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {!loading && categories.length === 0 && (
                    <div className="p-20 text-center flex flex-col items-center">
                        <PackageIcon className="h-12 w-12 text-muted-foreground/20 mb-4" />
                        <p className="text-muted-foreground font-medium italic">No hay categorías configuradas aún</p>
                    </div>
                )}
            </div>
        </div>
    )
}
