"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Edit, Trash2, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { MenuItem } from '@/lib/cms/types'
import { toast } from 'sonner'

export function MenuItemsTable() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMenuItems()
  }, [])

  async function fetchMenuItems() {
    try {
      const response = await fetch('/api/menu')
      const data = await response.json()
      
      if (response.ok) {
        setMenuItems(data)
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
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Cargando platillos...</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Platillo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categoría
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Precio
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {menuItems.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-10 w-10 rounded-full object-cover mr-3"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <ImageIcon className="h-5 w-5 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {item.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.description?.substring(0, 50)}...
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge variant="secondary">
                  {item.category?.name || 'Sin categoría'}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-semibold text-gray-900">
                  ${item.price.toFixed(2)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge variant={item.is_active ? 'default' : 'secondary'}>
                  {item.is_active ? 'Activo' : 'Inactivo'}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <Link href={`/admin/menu/${item.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {menuItems.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No hay platillos registrados</p>
          <Link href="/admin/menu/new">
            <Button className="mt-4 bg-orange-600 hover:bg-orange-700">
              Agregar primer platillo
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
