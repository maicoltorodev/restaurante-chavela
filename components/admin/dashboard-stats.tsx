import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Utensils, Package, MessageSquare, TrendingUp } from 'lucide-react'

export function DashboardStats() {
  // Estos datos vendrían de la base de datos
  const stats = [
    {
      title: 'Total Platillos',
      value: '24',
      change: '+2 esta semana',
      icon: Utensils,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Categorías',
      value: '4',
      change: 'Sin cambios',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Testimonios',
      value: '12',
      change: '+3 este mes',
      icon: MessageSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Actualizaciones',
      value: '8',
      change: 'Hoy',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-gray-500">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
