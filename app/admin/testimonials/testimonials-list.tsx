"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Star, Trash2, CheckCircle, XCircle, MessageSquare } from 'lucide-react'
import { toast } from 'sonner'
import { Testimonial } from '@/lib/cms/types'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface TestimonialsListProps {
    initialTestimonials: Testimonial[]
}

export default function TestimonialsList({ initialTestimonials }: TestimonialsListProps) {
    const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials)
    const router = useRouter()

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
                // Actualizar estado local para feedback inmediato
                setTestimonials(prev => prev.map(t =>
                    t.id === testimonial.id ? { ...t, is_approved: !t.is_approved } : t
                ))
                router.refresh()
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
                setTestimonials(prev => prev.filter(t => t.id !== id))
                router.refresh()
            }
        } catch (error) {
            toast.error('Error al eliminar')
        }
    }

    return (
        <div className="bg-[#14100f] rounded-2xl border border-white/5 shadow-2xl overflow-hidden">
            <div className="divide-y divide-white/5">
                {testimonials.map((testi) => (
                    <div key={testi.id} className="p-8 group hover:bg-white/[0.02] transition-all">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                            <div className="space-y-3">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center border border-primary/20 text-primary font-bold text-lg">
                                        {testi.customer_name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white group-hover:text-primary transition-colors">{testi.customer_name}</h3>
                                        <div className="flex gap-1 mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={12}
                                                    className={cn(
                                                        "transition-all",
                                                        i < testi.rating ? "fill-primary text-primary" : "text-white/10"
                                                    )}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <Badge
                                        variant={testi.is_approved ? 'default' : 'secondary'}
                                        className={cn(
                                            "ml-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold border-none",
                                            testi.is_approved ? "bg-green-500/10 text-green-500" : "bg-orange-500/10 text-orange-500"
                                        )}
                                    >
                                        {testi.is_approved ? 'Aprobado' : 'Pendiente'}
                                    </Badge>
                                </div>
                                <div className="relative">
                                    <p className="text-muted-foreground italic leading-relaxed pl-4 border-l-2 border-primary/20 bg-primary/5 py-4 rounded-r-xl pr-6">
                                        "{testi.comment}"
                                    </p>
                                </div>
                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] text-muted-foreground/40 uppercase tracking-[0.2em] font-bold">
                                    <div className="flex items-center gap-2">
                                        <span>Fecha:</span>
                                        <span className="text-muted-foreground/60">{new Date(testi.created_at).toLocaleDateString()}</span>
                                    </div>
                                    {!testi.is_approved && (
                                        <div className="flex items-center gap-2 text-orange-500/80 bg-orange-500/5 px-2 py-1 rounded">
                                            <span>Expira en:</span>
                                            <span>
                                                {(() => {
                                                    const created = new Date(testi.created_at)
                                                    const expireDate = new Date(created)
                                                    expireDate.setDate(expireDate.getDate() + 7)
                                                    const now = new Date()
                                                    const diffTime = expireDate.getTime() - now.getTime()
                                                    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

                                                    if (daysLeft <= 0) return 'Hoy'
                                                    return `${daysLeft} día${daysLeft !== 1 ? 's' : ''}`
                                                })()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-2 self-end md:self-start">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleToggleStatus(testi)}
                                    className={cn(
                                        "h-10 px-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all",
                                        testi.is_approved
                                            ? "border-orange-500/20 text-orange-500 hover:bg-orange-500/10"
                                            : "border-green-500/20 text-green-500 hover:bg-green-500/10"
                                    )}
                                >
                                    {testi.is_approved ? <XCircle className="h-4 w-4 mr-2" /> : <CheckCircle className="h-4 w-4 mr-2" />}
                                    {testi.is_approved ? 'Ocultar' : 'Aprobar'}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDelete(testi.id)}
                                    className="h-10 w-10 p-0 rounded-xl text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-all font-sans"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
                {testimonials.length === 0 && (
                    <div className="p-20 text-center flex flex-col items-center">
                        <MessageSquare className="h-12 w-12 text-muted-foreground/20 mb-4" />
                        <p className="text-muted-foreground font-medium italic">No hay testimonios pendientes por moderar</p>
                    </div>
                )}
            </div>
        </div>
    )
}
