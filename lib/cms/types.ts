export interface Category {
  id: string
  name: string
  description: string | null
  order_index: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface MenuItem {
  id: string
  category_id: string
  name: string
  description: string | null
  price: number
  ingredients: string[]
  image_url: string | null
  tag: string | null
  order_index: number
  is_active: boolean
  allergens: string[]
  created_at: string
  updated_at: string
  category?: Category
}

export interface RestaurantInfo {
  id: string
  key: string
  value: string | null
  updated_at: string
}

export interface Testimonial {
  id: string
  customer_name: string
  rating: number
  comment: string | null
  is_approved: boolean
  created_at: string
  updated_at: string
}

export interface AdminUser {
  id: string
  username: string
  role: string
  last_login: string | null
  created_at: string
}
