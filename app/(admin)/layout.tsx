import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/supabase/auth'
import { Sidebar } from '@/components/admin/sidebar'
import { Header } from '@/components/admin/header'
import { RealtimeUpdater } from '@/components/admin/realtime-updater'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token || !verifyToken(token)) {
    redirect('/login')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <RealtimeUpdater />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
