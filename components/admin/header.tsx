"use client"

import { useState } from 'react'
import { Search, Menu } from 'lucide-react'

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="bg-[#14100f]/80 backdrop-blur-md border-b border-white/5 z-20">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-white transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="relative group hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Buscar en el panel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-black/20 border border-white/5 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all w-64 text-white placeholder:text-muted-foreground/40"
            />
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Chef Privado</span>
            <span className="text-[8px] uppercase tracking-[0.4em] text-muted-foreground/40">Acceso VIP</span>
          </div>
        </div>
      </div>
    </header>
  )
}
