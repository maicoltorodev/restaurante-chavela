import { createSupabaseClient, createPublicClient } from './server'
import { Category, MenuItem, RestaurantInfo, Testimonial } from '../cms/types'
import { unstable_cache } from 'next/cache'

export const getCategories = unstable_cache(
  async (): Promise<Category[]> => {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  },
  ['categories'],
  { tags: ['categories'] }
)

export const getMenuItems = unstable_cache(
  async (): Promise<MenuItem[]> => {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('menu_items')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('is_active', true)
      .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
  },
  ['menu-items'],
  { tags: ['menu-items'] }
)

export async function getMenuItemsByCategory(categoryId: string): Promise<MenuItem[]> {
  const supabase = createPublicClient()

  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .order('order_index', { ascending: true })

  if (error) throw error
  return data || []
}

export async function createMenuItem(item: Omit<MenuItem, 'id' | 'created_at' | 'updated_at'>): Promise<MenuItem> {
  const supabase = await createSupabaseClient()

  const { data, error } = await supabase
    .from('menu_items')
    .insert(item)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateMenuItem(id: string, item: Partial<MenuItem>): Promise<MenuItem> {
  const supabase = await createSupabaseClient()

  const { data, error } = await supabase
    .from('menu_items')
    .update(item)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteMenuItem(id: string): Promise<void> {
  const supabase = await createSupabaseClient()

  const { error } = await supabase
    .from('menu_items')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function createCategory(category: Omit<Category, 'id' | 'created_at' | 'updated_at'>): Promise<Category> {
  const supabase = await createSupabaseClient()

  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateCategory(id: string, category: Partial<Category>): Promise<Category> {
  const supabase = await createSupabaseClient()

  const { data, error } = await supabase
    .from('categories')
    .update(category)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getCategoryById(id: string): Promise<Category> {
  const supabase = createPublicClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function deleteCategory(id: string): Promise<void> {
  const supabase = await createSupabaseClient()
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export const getRestaurantInfo = unstable_cache(
  async (): Promise<RestaurantInfo[]> => {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('restaurant_info')
      .select('*')
      .order('key')

    if (error) throw error
    return data || []
  },
  ['restaurant-info'],
  { tags: ['restaurant-info'] }
)

export async function updateRestaurantInfo(key: string, value: string | null): Promise<void> {
  const supabase = await createSupabaseClient()
  const { error } = await supabase
    .from('restaurant_info')
    .upsert({ key, value }, { onConflict: 'key' })

  if (error) throw error
}

export async function getMenuItemById(id: string): Promise<MenuItem> {
  const supabase = createPublicClient()

  const { data, error } = await supabase
    .from('menu_items')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export const getApprovedTestimonials = unstable_cache(
  async (): Promise<Testimonial[]> => {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .limit(6) // Mostrar solo los últimos 6 aprobados

    if (error) throw error
    return data || []
  },
  ['testimonials-approved'],
  { tags: ['testimonials'] }
)

export const getAdminTestimonials = unstable_cache(
  async (): Promise<Testimonial[]> => {
    const supabase = createPublicClient() // Usamos cliente público porque RLS maneja acceso, pero para admin idealmente service role si RLS bloquea
    // Nota: Como es server component seguro, podríamos usar createSupabaseClient para asegurar auth, 
    // pero unstable_cache y cookies a veces pelean. Por ahora público con RLS o service role si necesario.
    // Dado que unstable_cache no recibe cookies, mejor usamos query directa en la página admin o aceptamos caché público.
    // Para simplificar y dado que 'unstable_cache' cachea para todos, mejor NO cachear la vista de admin o usar tag distinta.
    // Vamos a hacer fetch directo en admin page, aquí solo exportamos la función sin caché o con tag de admin.

    // Mejor estrategia: No usar unstable_cache para admin panel para ver datos frescos siempre.
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },
  ['testimonials-admin'],
  { tags: ['testimonials'] }
)

export async function createTestimonial(testimonial: Pick<Testimonial, 'customer_name' | 'rating' | 'comment'>): Promise<void> {
  const supabase = createPublicClient() // Cliente público para envíos desde la web

  // 1. Insertar nuevo testimonio (is_approved: false por default en DB o forzado aquí)
  // No usamos select() porque el usuario anónimo no tiene permisos para leer el testimonio pendiente (RLS)
  const { error } = await supabase
    .from('testimonials')
    .insert({
      ...testimonial,
      is_approved: false
    })

  if (error) throw error
}

/**
 * Función para limpiar testimonios antiguos y mantener la BD limpia.
 * Se llama después de aprobar o insertar.
 */
export async function cleanupTestimonials(): Promise<void> {
  const supabase = await createSupabaseClient() // Cliente admin para borrar

  // 1. Mantener solo los últimos 20 APROBADOS
  const { data: approvedIds } = await supabase
    .from('testimonials')
    .select('id')
    .eq('is_approved', true)
    .order('created_at', { ascending: false })
    .range(20, 1000) // Obtener los IDs que sobran después del 20

  if (approvedIds && approvedIds.length > 0) {
    await supabase.from('testimonials').delete().in('id', approvedIds.map(t => t.id))
  }

  // 2. Mantener solo los últimos 20 PENDIENTES
  const { data: pendingIds } = await supabase
    .from('testimonials')
    .select('id')
    .eq('is_approved', false)
    .order('created_at', { ascending: false })
    .range(20, 1000)

  if (pendingIds && pendingIds.length > 0) {
    await supabase.from('testimonials').delete().in('id', pendingIds.map(t => t.id))
  }

  // 3. Eliminar PENDIENTES con más de 1 semana
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

  await supabase
    .from('testimonials')
    .delete()
    .eq('is_approved', false)
    .lt('created_at', oneWeekAgo.toISOString())
}

export async function updateTestimonial(id: string, testimonial: Partial<Testimonial>): Promise<Testimonial> {
  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('testimonials')
    .update(testimonial)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error

  // Limpiar BD después de actualizar
  await cleanupTestimonials()

  return data
}

export async function deleteTestimonial(id: string): Promise<void> {
  const supabase = await createSupabaseClient()
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id)

  if (error) throw error
}
