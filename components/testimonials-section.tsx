import { Star, Quote } from "lucide-react"
import { Testimonial } from "@/lib/cms/types"

interface TestimonialsSectionProps {
    initialTestimonials: Testimonial[]
}

export function TestimonialsSection({ initialTestimonials }: TestimonialsSectionProps) {
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
                    <div className="flex flex-col items-center sm:items-end text-center sm:text-right">
                        <p className="text-4xl sm:text-5xl font-serif text-primary font-bold leading-none mb-2">4.9/5</p>
                        <div className="flex gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="text-primary fill-primary" size={12} />
                            ))}
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold italic">Calificación promedio</p>
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
