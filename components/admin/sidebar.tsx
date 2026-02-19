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

export function Sidebar() {
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
    <div className="flex flex-col w-64 bg-white shadow-lg">
      <div className="flex items-center justify-center h-16 bg-orange-600">
        <h1 className="text-xl font-bold text-white">🌮 Chavela CMS</h1>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                isActive
                  ? 'bg-orange-100 text-orange-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  )
}
