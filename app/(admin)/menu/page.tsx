import { Button } from '@/components/ui/button'
import { Plus, Search } from 'lucide-react'
import Link from 'next/link'
import { MenuItemsTable } from '@/components/admin/menu-items-table'

export default function MenuPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Menú</h1>
          <p className="text-gray-600">Gestiona los platillos de tu restaurante</p>
        </div>
        <Link href="/admin/menu/new">
          <Button className="bg-orange-600 hover:bg-orange-700">
            <Plus className="mr-2 h-4 w-4" />
            Agregar Platillo
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar platillos..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <MenuItemsTable />
      </div>
    </div>
  )
}
