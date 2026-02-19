import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export function createPublicClient() {
  return createClient(supabaseUrl, supabaseAnonKey)
}

export async function createSupabaseClient() {
  const cookieStore = await cookies()

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false
    },
    global: {
      headers: {
        Cookie: cookieStore.toString()
      }
    }
  })
}
