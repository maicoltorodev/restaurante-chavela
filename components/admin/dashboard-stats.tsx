import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Utensils, Package, MessageSquare, TrendingUp, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DashboardStatsProps {
  menuCount: number
  activeMenuCount: number
  categoriesCount: number
  testimonialsCount: number
  pendingTestimonialsCount: number
  todayActivityCount: number
}

export function DashboardStats({ menuCount, activeMenuCount, categoriesCount, testimonialsCount, pendingTestimonialsCount, todayActivityCount }: DashboardStatsProps) {
  const stats = [
    {
      title: 'Total Platillos',
      value: menuCount.toString(),
      change: `${activeMenuCount} activos`,
      icon: Utensils,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10'
    },
    {
      title: 'Secciones',
      value: categoriesCount.toString(),
      change: 'Arquitectura Carta',
      icon: Package,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Testimonios',
      value: testimonialsCount.toString(),
      change: `${pendingTestimonialsCount} pendientes`,
      icon: MessageSquare,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10'
    },
    {
      title: 'Actividad Hoy',
      value: todayActivityCount.toString(),
      change: todayActivityCount === 0 ? 'Sin actividad hoy' : `${todayActivityCount === 1 ? 'cambio realizado' : 'cambios realizados'}`,
      icon: TrendingUp,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-[#14100f] border-white/5 rounded-2xl shadow-xl group hover:border-primary/20 transition-all duration-500 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-3xl group-hover:bg-primary/10 transition-colors" />

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
              {stat.title}
            </CardTitle>
            <div className={cn("p-2 rounded-xl transition-all duration-300 group-hover:scale-110", stat.bgColor)}>
              <stat.icon className={cn("h-4 w-4", stat.color)} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-serif text-white mb-2">{stat.value}</div>
            <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
              <Sparkles className="h-2 w-2 mr-1.5 text-primary/40" />
              {stat.change}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
