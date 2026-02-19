import { DashboardStats } from '@/components/admin/dashboard-stats'
import { RecentActivity } from '@/components/admin/recent-activity'

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Bienvenido al panel de administración de Chavela</p>
      </div>

      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
          <div className="space-y-3">
            <a
              href="/admin/menu/new"
              className="block p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <p className="font-medium text-orange-700">➕ Agregar nuevo platillo</p>
            </a>
            <a
              href="/admin/categories/new"
              className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <p className="font-medium text-blue-700">📦 Crear categoría</p>
            </a>
            <a
              href="/admin/testimonials"
              className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <p className="font-medium text-green-700">💬 Gestionar testimonios</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
