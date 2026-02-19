import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Edit, Plus, MessageSquare } from 'lucide-react'

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      action: 'Nuevo platillo agregado',
      entity: 'Taco de Gobernador',
      time: 'Hace 2 horas',
      icon: Plus,
      color: 'text-green-600'
    },
    {
      id: 2,
      action: 'Precio actualizado',
      entity: 'Taco al Pastor',
      time: 'Hace 4 horas',
      icon: Edit,
      color: 'text-blue-600'
    },
    {
      id: 3,
      action: 'Nuevo testimonio',
      entity: 'María González',
      time: 'Hace 6 horas',
      icon: MessageSquare,
      color: 'text-purple-600'
    },
    {
      id: 4,
      action: 'Categoría modificada',
      entity: 'Tacos Especiales',
      time: 'Ayer',
      icon: Edit,
      color: 'text-orange-600'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          Actividad Reciente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <activity.icon className={`h-5 w-5 mt-0.5 ${activity.color}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.action}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {activity.entity}
                </p>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
