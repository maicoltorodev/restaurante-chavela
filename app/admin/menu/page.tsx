import { Button } from '@/components/ui/button'
import { Plus, Search } from 'lucide-react'
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
        <div className="p-6 border-b border-white/5 bg-black/20">
          <div className="relative group max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Buscar platillos por nombre..."
              className="pl-10 pr-4 py-2.5 w-full bg-black/40 border border-white/5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all text-white placeholder:text-muted-foreground/30"
            />
          </div>
        </div>

        <MenuItemsTable />
      </div>
    </div>
  )
}
