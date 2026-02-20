"use client"

import { Star, Quote, Send, X, ChevronRight, ChevronLeft } from "lucide-react"
import { Testimonial } from "@/lib/cms/types"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface TestimonialsSectionProps {
    initialTestimonials: Testimonial[]
}

export function TestimonialsSection({ initialTestimonials }: TestimonialsSectionProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [step, setStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        comment: "",
        rating: 5,
        customer_name: "",
        honeypot: "" // Campo trampa anti-spam
    })

    const handleSubmit = async () => {
        if (!formData.comment || !formData.customer_name) return

        setIsSubmitting(true)
        try {
            const response = await fetch('/api/testimonials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                toast.success('¡Gracias por tu opinión!', {
                    description: 'Tu comentario pasará por revisión antes de publicarse.'
                })
                setIsOpen(false)
                setStep(1)
                setFormData({ comment: "", rating: 5, customer_name: "", honeypot: "" })
            } else {
                toast.error('Error al enviar')
            }
        } catch (error) {
            toast.error('Error de conexión')
        } finally {
            setIsSubmitting(false)
        }
    }

    const nextStep = () => {
        if (step === 1 && !formData.comment.trim()) {
            toast.error("Por favor escribe tu comentario")
            return
        }
        if (step === 2 && !formData.customer_name.trim()) {
            toast.error("Por favor escribe tu nombre")
            return
        }
        setStep(step + 1)
    }

    const prevStep = () => setStep(step - 1)

    return (
        <section id="testimonios" className="py-20 sm:py-32 px-6 bg-card/30 relative overflow-hidden">
            {/* Elementos decorativos de fondo similares a About */}
            <div className="absolute bottom-0 left-0 w-1/3 h-full bg-primary/5 skew-x-12 -translate-x-1/2 pointer-events-none" />
            <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16">
                    <div className="max-w-2xl text-center sm:text-left">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full mb-6">
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <p className="text-primary text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold">
                                Opiniones
                            </p>
                        </div>
                        <h2 className="font-serif text-4xl sm:text-6xl text-foreground leading-[1.1]">
                            Experiencias que <span className="text-primary italic">enamoran</span>
                        </h2>
                    </div>

                    <div className="flex flex-col items-center sm:items-end gap-4">
                        <div className="flex flex-col items-center sm:items-end text-center sm:text-right">
                            <p className="text-4xl sm:text-5xl font-serif text-primary font-bold leading-none mb-2">4.9/5</p>
                            <div className="flex gap-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="text-primary fill-primary" size={12} />
                                ))}
                            </div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold italic">Calificación promedio</p>
                        </div>

                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                                <Button size="lg" className="rounded-full px-8 font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/20 transition-all">
                                    Dejar mi Opinión
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md bg-zinc-950 border-white/10 p-0 overflow-hidden gap-0">
                                <DialogTitle className="sr-only">Dejar Testimonio</DialogTitle>
                                <div className="p-6 bg-gradient-to-br from-primary/20 to-zinc-950 border-b border-white/10">
                                    <h3 className="text-xl font-serif text-white">Tu Experiencia</h3>
                                    <p className="text-white/60 text-xs mt-1">Comparte qué tal te pareció Chavela</p>
                                </div>
                                <div className="p-6 min-h-[300px] flex flex-col">
                                    <AnimatePresence mode="wait">
                                        {step === 1 && (
                                            <motion.div
                                                key="step1"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="flex-1 flex flex-col gap-4"
                                            >
                                                <label className="text-sm font-bold text-white/80 uppercase tracking-wider">Tu Mensaje</label>
                                                <Textarea
                                                    placeholder="Cuéntanos qué fue lo que más te gustó..."
                                                    className="flex-1 bg-white/5 border-white/10 focus:border-primary/50 resize-none text-base"
                                                    value={formData.comment}
                                                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                                />
                                                <div className="flex justify-end relative">
                                                    {/* Campo Honeypot Oculto */}
                                                    <input
                                                        type="text"
                                                        name="website_url_hp"
                                                        value={formData.honeypot}
                                                        onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                                                        className="absolute opacity-0 -z-10 w-0 h-0"
                                                        tabIndex={-1}
                                                        autoComplete="off"
                                                    />
                                                    <Button onClick={nextStep} className="rounded-full px-6 bg-white text-black hover:bg-white/90">
                                                        Siguiente <ChevronRight className="ml-2 h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        )}
                                        {step === 2 && (
                                            <motion.div
                                                key="step2"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="flex-1 flex flex-col gap-4"
                                            >
                                                <label className="text-sm font-bold text-white/80 uppercase tracking-wider">Tu Nombre</label>
                                                <Input
                                                    placeholder="¿Cómo te llamas?"
                                                    className="bg-white/5 border-white/10 focus:border-primary/50 text-lg h-12"
                                                    value={formData.customer_name}
                                                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                                                />
                                                <div className="flex justify-between mt-auto">
                                                    <Button variant="ghost" onClick={prevStep} className="text-white/60 hover:text-white">
                                                        <ChevronLeft className="mr-2 h-4 w-4" /> Volver
                                                    </Button>
                                                    <Button onClick={nextStep} className="rounded-full px-6 bg-white text-black hover:bg-white/90">
                                                        Siguiente <ChevronRight className="ml-2 h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        )}
                                        {step === 3 && (
                                            <motion.div
                                                key="step3"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="flex-1 flex flex-col gap-6 items-center justify-center text-center"
                                            >
                                                <label className="text-sm font-bold text-white/80 uppercase tracking-wider">Calificación</label>
                                                <div className="flex gap-2">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star}
                                                            onClick={() => setFormData({ ...formData, rating: star })}
                                                            className="transition-all hover:scale-110 focus:outline-none"
                                                        >
                                                            <Star
                                                                size={32}
                                                                className={cn(
                                                                    "transition-colors",
                                                                    star <= formData.rating ? "fill-primary text-primary" : "text-white/10"
                                                                )}
                                                            />
                                                        </button>
                                                    ))}
                                                </div>
                                                <p className="text-white/40 text-sm font-serif italic">
                                                    {formData.rating === 5 ? "¡Excelente!" :
                                                        formData.rating >= 4 ? "¡Muy bueno!" :
                                                            "Gracias por tu honestidad"}
                                                </p>

                                                <div className="flex justify-between w-full mt-auto pt-4">
                                                    <Button variant="ghost" onClick={prevStep} className="text-white/60 hover:text-white">
                                                        <ChevronLeft className="mr-2 h-4 w-4" /> Volver
                                                    </Button>
                                                    <Button
                                                        onClick={handleSubmit}
                                                        disabled={isSubmitting}
                                                        className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
                                                    >
                                                        {isSubmitting ? 'Enviando...' : 'Enviar Opinión'}
                                                        {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <div className="flex gap-1 justify-center pb-6">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className={cn("h-1 rounded-full transition-all duration-300", step === i ? "w-8 bg-primary" : "w-2 bg-white/10")} />
                                    ))}
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {initialTestimonials.map((testi, i) => (
                        <div
                            key={testi.id}
                            className="group bg-background border border-border/50 p-7 sm:p-10 rounded-3xl hover:border-primary/40 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] relative flex flex-col justify-between"
                        >
                            <div className="absolute top-7 sm:top-8 right-8 sm:right-10 text-primary opacity-5 group-hover:opacity-20 transition-opacity">
                                <Quote size={40} className="sm:size-12" />
                            </div>

                            <div>
                                <div className="flex gap-1 mb-6">
                                    {[...Array(testi.rating)].map((_, i) => (
                                        <Star key={i} className="text-primary fill-primary" size={12} />
                                    ))}
                                </div>

                                <p className="text-muted-foreground text-base sm:text-lg italic mb-8 leading-relaxed">
                                    "{testi.comment}"
                                </p>
                            </div>

                            <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                                <div className="relative shrink-0">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-serif text-xl font-bold border border-primary/10">
                                        {testi.customer_name.charAt(0)}
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-background border-2 border-primary rounded-full flex items-center justify-center font-bold text-[8px] text-primary shadow-lg">
                                        ✓
                                    </div>
                                </div>
                                <div className="min-w-0">
                                    <p className="font-serif text-foreground text-lg leading-tight mb-1 truncate">{testi.customer_name}</p>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-primary/70 font-bold">Cliente</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
