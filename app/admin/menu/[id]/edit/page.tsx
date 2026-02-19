import React from 'react'
import { getMenuItemById, getCategories } from '@/lib/supabase/queries'
import EditMenuItemForm from './edit-menu-item-form'
import { notFound } from 'next/navigation'

export default async function EditMenuItemPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    try {
        const [menuItem, categories] = await Promise.all([
            getMenuItemById(id),
            getCategories()
        ])

        if (!menuItem) {
            notFound()
        }

        return <EditMenuItemForm menuItem={menuItem} categories={categories} />
    } catch (error) {
        console.error('Error in EditMenuItemPage:', error)
        notFound()
    }
}
