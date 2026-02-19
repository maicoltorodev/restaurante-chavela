import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/supabase/auth'
import { AdminLayoutClient } from './admin-layout-client'
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
    <>
      <RealtimeUpdater />
      <AdminLayoutClient>
        {children}
      </AdminLayoutClient>
    </>
  )
}
