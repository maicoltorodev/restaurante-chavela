import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { MenuItemsTable } from '@/components/admin/menu-items-table'

export default function MenuPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-white">Menú</h1>
          <p className="text-muted-foreground text-sm">Gestiona los platillos de su restaurante</p>
        </div>
        <Link href="/admin/menu/new">
          <Button className="bg-primary hover:bg-primary/90 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95">
            <Plus className="mr-2 h-4 w-4" />
            Agregar Platillo
          </Button>
        </Link>
      </div>

      <div className="bg-[#14100f] rounded-2xl border border-white/5 shadow-2xl overflow-hidden">

        <MenuItemsTable />
      </div>
    </div>
  )
}
