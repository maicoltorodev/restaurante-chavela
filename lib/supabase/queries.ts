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
  { tags: ['categories'], revalidate: 3600 }
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
  { tags: ['menu-items'], revalidate: 3600 }
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
  { tags: ['restaurant-info'], revalidate: 3600 }
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

export const getTestimonials = unstable_cache(
  async (): Promise<Testimonial[]> => {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },
  ['testimonials'],
  { tags: ['testimonials'], revalidate: 3600 }
)

export async function updateTestimonial(id: string, testimonial: Partial<Testimonial>): Promise<Testimonial> {
  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('testimonials')
    .update(testimonial)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
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
