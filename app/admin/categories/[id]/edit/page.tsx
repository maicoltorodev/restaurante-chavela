import React from 'react'
import { getCategoryById } from '@/lib/supabase/queries'
import EditCategoryForm from './edit-category-form'
import { notFound } from 'next/navigation'

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    try {
        const category = await getCategoryById(id)

        if (!category) {
            notFound()
        }

        return <EditCategoryForm category={category} />
    } catch (error) {
        console.error('Error in EditCategoryPage:', error)
        notFound()
    }
}
