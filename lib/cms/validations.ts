import { z } from 'zod'

export const menuItemSchema = z.object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    description: z.string().nullable().optional().or(z.literal('')),
    price: z.coerce.number().positive('El precio debe ser positivo'),
    category_id: z.string().uuid('Categoría no válida'),
    image_url: z.string().nullable().optional().or(z.literal('')),
    tag: z.string().nullable().optional().or(z.literal('')),
    ingredients: z.array(z.string()).default([]),
    allergens: z.array(z.string()).default([]),
    is_active: z.boolean().default(true),
    order_index: z.coerce.number().int().default(0)
})

export const categorySchema = z.object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    description: z.string().nullable().optional().or(z.literal('')),
    order_index: z.coerce.number().int().default(0),
    is_active: z.boolean().default(true)
})

export type MenuItemInput = z.infer<typeof menuItemSchema>
export type CategoryInput = z.infer<typeof categorySchema>
