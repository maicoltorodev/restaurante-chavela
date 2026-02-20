import { getDashboardStats, getRecentActivity } from '@/lib/supabase/queries'
import { DashboardStats } from '@/components/admin/dashboard-stats'
import { RecentActivity } from '@/components/admin/recent-activity'
import { Utensils, Package, MessageSquare, TrendingUp, ArrowRight } from 'lucide-react'

export default async function AdminDashboard() {
  const [stats, activities] = await Promise.all([
    getDashboardStats(),
    getRecentActivity()
  ])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif text-white">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Gestione la esencia culinaria de Chavela en tiempo real</p>
        </div>
      </div>

      <DashboardStats
        menuCount={stats.menuCount}
        activeMenuCount={stats.activeMenuCount}
        categoriesCount={stats.categoriesCount}
        testimonialsCount={stats.testimonialsCount}
        pendingTestimonialsCount={stats.pendingTestimonialsCount}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentActivity activities={activities} />
        <div className="bg-[#14100f] rounded-2xl border border-white/5 p-8 shadow-xl">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-serif text-white">Acciones Rápidas</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <a
              href="/admin/menu/new"
              className="group flex items-center p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-primary/10 hover:border-primary/20 transition-all"
            >
              <div className="h-10 w-10 bg-orange-500/10 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                <Utensils className="h-5 w-5 text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-white text-sm">Agregar Platillo</p>
                <p className="text-xs text-muted-foreground">Crea un nuevo ítem en el menú</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="/admin/categories/new"
              className="group flex items-center p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-blue-500/10 hover:border-blue-500/20 transition-all"
            >
              <div className="h-10 w-10 bg-blue-500/10 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                <Package className="h-5 w-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-white text-sm">Nueva Categoría</p>
                <p className="text-xs text-muted-foreground">Organiza tus secciones</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="/admin/testimonials"
              className="group flex items-center p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-green-500/10 hover:border-green-500/20 transition-all"
            >
              <div className="h-10 w-10 bg-green-500/10 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                <MessageSquare className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-white text-sm">Testimonios</p>
                <p className="text-xs text-muted-foreground">Modera las opiniones</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
