import { createSupabaseClient, createPublicClient } from './server'
import { Category, MenuItem, RestaurantInfo, Testimonial } from '../cms/types'
import { unstable_cache } from 'next/cache'

// ... existing code ...
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

export async function getAdminCategories(): Promise<Category[]> {
  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) throw error
  return data || []
}

// ... existing code ...
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

export async function getAdminMenuItems(): Promise<MenuItem[]> {
  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('menu_items')
    .select(`
      *,
      category:categories(*)
    `)
    .order('order_index', { ascending: true })

  if (error) throw error
  return data || []
}

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

export async function getAdminCategoryById(id: string): Promise<Category> {
  const supabase = await createSupabaseClient()
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

export async function getAdminMenuItemById(id: string): Promise<MenuItem> {
  const supabase = await createSupabaseClient()

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

export async function getAdminTestimonials(): Promise<Testimonial[]> {
  const supabase = await createSupabaseClient() // Cliente autenticado para ver todo

  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

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
