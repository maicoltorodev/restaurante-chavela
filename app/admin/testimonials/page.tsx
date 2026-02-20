import React from 'react'
import { getAdminTestimonials } from '@/lib/supabase/queries'
import TestimonialsList from './testimonials-list'

export default async function TestimonialsAdminPage() {
    const testimonials = await getAdminTestimonials()

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-serif text-white">Testimonios</h1>
                    <p className="text-muted-foreground text-sm mt-1">Modere las opiniones de sus selectos comensales</p>
                </div>
            </div>

            <TestimonialsList initialTestimonials={testimonials} />
        </div>
    )
}
