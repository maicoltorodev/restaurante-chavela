"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Home,
  Utensils,
  MessageSquare,
  Settings,
  LogOut,
  Package
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Menú', href: '/admin/menu', icon: Utensils },
  { name: 'Categorías', href: '/admin/categories', icon: Package },
  { name: 'Testimonios', href: '/admin/testimonials', icon: MessageSquare },
  { name: 'Configuración', href: '/admin/settings', icon: Settings },
]

import Image from 'next/image'
import { X } from 'lucide-react'

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      window.location.href = '/login'
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col w-72 bg-[#14100f] border-r border-white/5 transition-transform duration-300 transform lg:translate-x-0 lg:static lg:inset-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between px-8 h-20 border-b border-white/5 bg-black/40">
          <div className="flex items-center">
            <div className="relative w-8 h-8 mr-3">
              <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <h1 className="text-xl font-serif text-white tracking-tight">Chavela <span className="text-primary font-sans text-xs uppercase font-bold tracking-widest ml-1">CMS</span></h1>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-muted-foreground hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center px-6 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 group relative',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                )}
              >
                {isActive && (
                  <div className="absolute left-0 w-1 h-6 bg-primary rounded-r-full" />
                )}
                <item.icon className={cn(
                  "mr-4 h-5 w-5 transition-transform group-hover:scale-110",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                )} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-6 border-t border-white/5 bg-black/20">
          <div className="flex items-center mb-6 px-2">
            <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30 mr-3 overflow-hidden">
              <Image src="/images/logo.png" alt="Admin" width={24} height={24} className="opacity-80" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-white truncate uppercase tracking-tighter">Chef Admin</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest truncate">Sistema Activo</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-6 py-3 text-sm font-bold text-muted-foreground rounded-xl hover:bg-destructive/10 hover:text-destructive transition-all group"
          >
            <LogOut className="mr-4 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </>
  )
}
