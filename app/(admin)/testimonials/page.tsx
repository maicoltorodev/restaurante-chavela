"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Star, Trash2, CheckCircle, XCircle } from 'lucide-react'
import { toast } from 'sonner'
import { Testimonial } from '@/lib/cms/types'
import { Badge } from '@/components/ui/badge'

export default function TestimonialsAdminPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchTestimonials()
    }, [])

    async function fetchTestimonials() {
        try {
            const response = await fetch('/api/testimonials')
            const data = await response.json()
            if (response.ok) setTestimonials(data)
        } catch (error) {
            toast.error('Error al cargar testimonios')
        } finally {
            setLoading(false)
        }
    }

    async function handleToggleStatus(testimonial: Testimonial) {
        try {
            const response = await fetch('/api/testimonials', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: testimonial.id,
                    is_approved: !testimonial.is_approved
                }),
            })

            if (response.ok) {
                toast.success(testimonial.is_approved ? 'Testimonio ocultado' : 'Testimonio aprobado')
                fetchTestimonials()
            }
        } catch (error) {
            toast.error('Error al actualizar estado')
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('¿Estás seguro de eliminar este testimonio?')) return
        try {
            const response = await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' })
            if (response.ok) {
                toast.success('Testimonio eliminado')
                fetchTestimonials()
            }
        } catch (error) {
            toast.error('Error al eliminar')
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Testimonios</h1>
                <p className="text-gray-600">Modera las opiniones de tus clientes</p>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center">Cargando...</div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {testimonials.map((testi) => (
                            <div key={testi.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <h3 className="font-bold text-gray-900">{testi.customer_name}</h3>
                                            <Badge variant={testi.is_approved ? 'default' : 'secondary'}>
                                                {testi.is_approved ? 'Aprobado' : 'Pendiente'}
                                            </Badge>
                                        </div>
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    className={i < testi.rating ? "fill-orange-400 text-orange-400" : "text-gray-300"}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleToggleStatus(testi)}
                                            className={testi.is_approved ? "text-amber-600 border-amber-200" : "text-green-600 border-green-200"}
                                        >
                                            {testi.is_approved ? <XCircle className="h-4 w-4 mr-2" /> : <CheckCircle className="h-4 w-4 mr-2" />}
                                            {testi.is_approved ? 'Ocultar' : 'Aprobar'}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDelete(testi.id)}
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <p className="mt-3 text-gray-600 italic">"{testi.comment}"</p>
                                <p className="mt-2 text-[10px] text-gray-400 uppercase tracking-widest">
                                    {new Date(testi.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                        {testimonials.length === 0 && (
                            <div className="p-12 text-center text-gray-500">
                                No hay testimonios registrados.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
