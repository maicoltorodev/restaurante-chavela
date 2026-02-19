"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { Category } from '@/lib/cms/types'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'

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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Categorías</h1>
                    <p className="text-gray-600">Gestiona las secciones del menú</p>
                </div>
                <Link href="/admin/categories/new">
                    <Button className="bg-orange-600 hover:bg-orange-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Nueva Categoría
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center">Cargando...</div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orden</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {categories.map((cat) => (
                                <tr key={cat.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cat.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cat.order_index}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Badge variant={cat.is_active ? 'default' : 'secondary'}>
                                            {cat.is_active ? 'Activa' : 'Inactiva'}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                                        <Link href={`/admin/categories/${cat.id}/edit`}>
                                            <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                                        </Link>
                                        <Button variant="ghost" size="sm" onClick={() => handleDelete(cat.id)} className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
