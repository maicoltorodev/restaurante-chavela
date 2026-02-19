"use client"

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'

interface RealtimeUpdaterProps {
  onMenuChange?: () => void
  onCategoryChange?: () => void
  onTestimonialChange?: () => void
}

export function RealtimeUpdater({ 
  onMenuChange, 
  onCategoryChange, 
  onTestimonialChange 
}: RealtimeUpdaterProps) {
  useEffect(() => {
    // Suscribirse a cambios en menu_items
    const menuSubscription = supabase
      .channel('menu_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'menu_items'
        },
        (payload) => {
          console.log('Menu item changed:', payload)
          toast.success('Menú actualizado en tiempo real')
          onMenuChange?.()
        }
      )
      .subscribe()

    // Suscribirse a cambios en categories
    const categorySubscription = supabase
      .channel('category_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'categories'
        },
        (payload) => {
          console.log('Category changed:', payload)
          toast.success('Categoría actualizada')
          onCategoryChange?.()
        }
      )
      .subscribe()

    // Suscribirse a cambios en testimonials
    const testimonialSubscription = supabase
      .channel('testimonial_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'testimonials'
        },
        (payload) => {
          console.log('Testimonial changed:', payload)
          toast.success('Nuevo testimonio recibido')
          onTestimonialChange?.()
        }
      )
      .subscribe()

    return () => {
      menuSubscription.unsubscribe()
      categorySubscription.unsubscribe()
      testimonialSubscription.unsubscribe()
    }
  }, [onMenuChange, onCategoryChange, onTestimonialChange])

  return null
}
