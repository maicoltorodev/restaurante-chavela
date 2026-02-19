import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createSupabaseClient } from './server'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

export function createToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '8h' })
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string }
  } catch {
    return null
  }
}

export async function createAdminUser(username: string, password: string) {
  const supabase = createSupabaseClient()
  const hashedPassword = await hashPassword(password)
  
  const { data, error } = await supabase
    .from('admin_users')
    .insert({
      username,
      password_hash: hashedPassword,
      role: 'admin'
    })
    .select()
    .single()
    
  return { data, error }
}

export async function getAdminUser(username: string) {
  const supabase = createSupabaseClient()
  
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('username', username)
    .single()
    
  return { data, error }
}
