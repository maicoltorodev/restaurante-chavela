"use client"

import React, { useState, useEffect } from 'react'
import { Plus, Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn, formatPrice } from '@/lib/utils'
import { Edit, Trash2, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { MenuItem } from '@/lib/cms/types'
import { toast } from 'sonner'

export function MenuItemsTable() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchMenuItems()
  }, [])

  async function fetchMenuItems() {
    try {
      const response = await fetch('/api/menu')
      const data = await response.json()

      if (response.ok) {
        // Ordenar primero por índice de categoría, luego por índice de ítem
        const sortedData = data.sort((a: MenuItem, b: MenuItem) => {
          const categoryOrderA = a.category?.order_index || 0
          const categoryOrderB = b.category?.order_index || 0

          if (categoryOrderA !== categoryOrderB) {
            return categoryOrderA - categoryOrderB
          }
          return a.order_index - b.order_index
        })
        setMenuItems(sortedData)
      } else {
        toast.error('Error al cargar los platillos')
      }
    } catch (error) {
      toast.error('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('¿Estás seguro de eliminar este platillo?')) return

    try {
      const response = await fetch(`/api/menu/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Platillo eliminado correctamente')
        fetchMenuItems()
      } else {
        toast.error('Error al eliminar el platillo')
      }
    } catch (error) {
      toast.error('Error de conexión')
    }
  }

  if (loading) {
    return (
      <div className="p-20 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground animate-pulse font-serif italic text-sm">Preparando el menú...</p>
      </div>
    )
  }


  // Filter items based on search term
  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tag?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Group items by category with metadata for sorting
  const groupedItems = filteredItems.reduce((acc: Record<string, { items: MenuItem[], order: number }>, item) => {
    const categoryName = item.category?.name || 'Varios'
    const categoryOrder = item.category?.order_index || 9999

    if (!acc[categoryName]) {
      acc[categoryName] = { items: [], order: categoryOrder }
    }
    acc[categoryName].items.push(item)
    return acc
  }, {})

  // Sort categories by their order index
  const sortedCategories = Object.entries(groupedItems)
    .sort(([, a], [, b]) => a.order - b.order)
    .map(([name, data]) => ({ name, items: data.items }))

  return (
    <div className="overflow-x-auto">
      <div className="p-6 border-b border-white/5 bg-black/20">
        <div className="relative group max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, descripción o etiqueta..."
            className="pl-10 pr-4 py-2.5 w-full bg-black/40 border border-white/5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all text-white placeholder:text-muted-foreground/30"
          />
        </div>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/5 bg-black/40">
            <th className="px-8 py-6 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] w-[40%]">Platillo</th>
            <th className="px-8 py-6 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Precio</th>
            <th className="px-8 py-6 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Estado</th>
            <th className="px-8 py-6 text-right text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {sortedCategories.map(({ name, items }) => (
            <React.Fragment key={name}>
              {/* Category Header Row */}
              <tr className="bg-primary/5">
                <td colSpan={4} className="px-8 py-3">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-primary/30"></span>
                    <span className="text-[11px] font-bold text-primary uppercase tracking-[0.4em]">
                      {name}
                    </span>
                    <Badge className="bg-primary/10 text-primary border-none text-[9px] h-5 min-w-[20px] justify-center px-1">
                      {items.length}
                    </Badge>
                    <span className="h-px flex-1 bg-white/5"></span>
                  </div>
                </td>
              </tr>
              {items.map((item) => (
                <tr key={item.id} className="group hover:bg-white/[0.02] transition-colors translate-z-0">
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="relative h-14 w-14 mr-5 group-hover:scale-105 transition-transform duration-300">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="h-full w-full rounded-2xl object-cover border border-white/5 shadow-lg group-hover:border-primary/20 transition-colors"
                          />
                        ) : (
                          <div className="h-full w-full rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-primary/5 transition-colors">
                            <ImageIcon className="h-6 w-6 text-muted-foreground/20 group-hover:text-primary/20" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col space-y-0.5">
                        <span className="text-sm font-bold text-white group-hover:text-primary transition-colors tracking-tight italic font-serif">{item.name}</span>
                        <span className="text-[11px] text-muted-foreground/40 max-w-[250px] truncate font-medium">{item.description}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 inline-flex items-center justify-center w-fit">
                        ${formatPrice(item.price)}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <div
                      className={cn(
                        "flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full w-fit",
                        item.is_active ? "text-green-500 bg-green-500/10" : "text-muted-foreground/40 bg-white/5"
                      )}
                    >
                      <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", item.is_active ? "bg-green-500 animate-pulse" : "bg-muted-foreground/20")}></span>
                      {item.is_active ? 'Activo' : 'Inactivo'}
                    </div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-3 opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                      <Link href={`/admin/menu/${item.id}/edit`}>
                        <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl bg-white/5 hover:bg-primary/20 hover:text-primary transition-all active:scale-90">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        className="h-10 w-10 p-0 rounded-xl bg-white/5 hover:bg-destructive/20 hover:text-destructive transition-all active:scale-90"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {menuItems.length === 0 && (
        <div className="p-20 text-center flex flex-col items-center">
          <div className="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
            <ImageIcon className="h-8 w-8 text-muted-foreground/20" />
          </div>
          <h3 className="text-white font-serif text-xl mb-2">Su menú está vacío</h3>
          <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-8">Comience a dar vida a su restaurante agregando el primer platillo artesanal.</p>
          <Link href="/admin/menu/new">
            <Button className="bg-primary hover:bg-primary/90 text-white font-bold h-12 px-8 rounded-xl shadow-xl shadow-primary/20 transition-all active:scale-95">
              Crear Nuevo Platillo
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
