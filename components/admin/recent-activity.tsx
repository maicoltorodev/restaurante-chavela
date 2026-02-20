import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Edit, Plus, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

export interface ActivityItem {
  type: string
  action: string
  entity: string
  created_at: string
}

export function RecentActivity({ activities }: { activities: ActivityItem[] }) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'menu': return { icon: Plus, color: 'text-emerald-400', bgColor: 'bg-emerald-500/10' }
      case 'category': return { icon: Clock, color: 'text-blue-400', bgColor: 'bg-blue-500/10' } // Using Clock as generic for category for now, or Package
      case 'testimonial': return { icon: MessageSquare, color: 'text-purple-400', bgColor: 'bg-purple-500/10' }
      default: return { icon: Edit, color: 'text-orange-400', bgColor: 'bg-orange-500/10' }
    }
  }

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
          {activities.length > 0 ? (
            activities.map((activity) => {
              const { icon: ActivityIcon, color, bgColor } = getActivityIcon(activity.type)
              return (
                <div key={`${activity.type}-${activity.created_at}`} className="flex items-start space-x-4 group">
                  <div className={cn(
                    "p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110 shadow-lg",
                    bgColor
                  )}>
                    <ActivityIcon className={cn("h-4 w-4", color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white leading-tight group-hover:text-primary transition-colors cursor-default">
                      {activity.action}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate mb-1.5 flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/20 mr-2" />
                      {activity.entity}
                    </p>
                    <p className="text-[9px] text-muted-foreground/40 uppercase tracking-[0.2em] font-bold">
                      {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true, locale: es })}
                    </p>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="text-center py-8 text-muted-foreground italic text-sm">
              No hay actividad reciente registrada.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
