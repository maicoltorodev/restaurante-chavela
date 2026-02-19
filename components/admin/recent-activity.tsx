import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Edit, Plus, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      action: 'Nuevo platillo agregado',
      entity: 'Taco de Gobernador',
      time: 'Hace 2 horas',
      icon: Plus,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10'
    },
    {
      id: 2,
      action: 'Precio actualizado',
      entity: 'Taco al Pastor',
      time: 'Hace 4 horas',
      icon: Edit,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      id: 3,
      action: 'Nuevo testimonio',
      entity: 'María González',
      time: 'Hace 6 horas',
      icon: MessageSquare,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
    {
      id: 4,
      action: 'Categoría modificada',
      entity: 'Tacos Especiales',
      time: 'Ayer',
      icon: Edit,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10'
    }
  ]

  return (
    <Card className="bg-[#14100f] border-white/5 rounded-2xl shadow-xl overflow-hidden">
      <CardHeader className="border-b border-white/5 bg-black/20 pb-4">
        <CardTitle className="flex items-center text-white font-serif text-xl px-2 pt-2">
          <Clock className="mr-3 h-5 w-5 text-primary" />
          Bitácora del Chef
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 group">
              <div className={cn(
                "p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110 shadow-lg",
                activity.bgColor
              )}>
                <activity.icon className={cn("h-4 w-4", activity.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white leading-tight group-hover:text-primary transition-colors cursor-default">
                  {activity.action}
                </p>
                <p className="text-[11px] text-muted-foreground truncate mb-1.5 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/20 mr-2" />
                  {activity.entity}
                </p>
                <p className="text-[9px] text-muted-foreground/40 uppercase tracking-[0.2em] font-bold">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
