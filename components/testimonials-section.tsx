import { Star, Quote } from "lucide-react"

const testimonials = [
    {
        name: "B Her",
        text: "Ambiente genial, personal muy amable, servicio rápido, comida fresca y muy buena temperatura de la comida! Recomendado 100%",
        stars: 5,
        tag: "Usaquén Local",
    },
    {
        name: "Nidia Valenzuela",
        text: "La comida espectacular. Todo delicioso y muy auténtico. Un pedacito de México en Bogotá.",
        stars: 5,
        tag: "Foodie",
    },
    {
        name: "Heydi León",
        text: "Muy buen lugar, muy buena atención y el servicio de los meseros excelente. La atmósfera es mágica.",
        stars: 5,
        tag: "Comensal",
    },
    {
        name: "Yuris yaneth Contreras",
        text: "Excelente servicio y la comida muy rica y el servicio excelente 10/10. Muy recomendado.",
        stars: 5,
        tag: "Recomendado",
    },
    {
        name: "Jose Tovar",
        text: "Excelente comida, servicio y ambiente en el corazón de Usaquén. Todo de 5 estrellas.",
        stars: 5,
        tag: "Visitante",
    },
    {
        name: "Paula Duran",
        text: "El mejor lugar para disfrutar de la auténtica fusión colombo-mexicana. ¡Volveré pronto!",
        stars: 5,
        tag: "Fiel Seguidora",
    },
]

export function TestimonialsSection() {
    return (
        <section id="testimonios" className="py-32 px-6 bg-card/30 relative overflow-hidden">
            {/* Elementos decorativos de fondo similares a About */}
            <div className="absolute bottom-0 left-0 w-1/3 h-full bg-primary/5 skew-x-12 -translate-x-1/2 pointer-events-none" />
            <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full mb-6">
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <p className="text-primary text-xs uppercase tracking-[0.3em] font-bold">
                                Opiniones
                            </p>
                        </div>
                        <h2 className="font-serif text-4xl sm:text-6xl text-foreground leading-[1.1]">
                            Experiencias que <span className="text-primary italic">enamoran</span>
                        </h2>
                    </div>
                    <div className="hidden lg:block text-right">
                        <p className="text-4xl font-serif text-primary font-bold">4.9/5</p>
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">Calificación promedio</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testi, i) => (
                        <div
                            key={i}
                            className="group bg-background border border-border/50 p-10 rounded-2xl hover:border-primary/40 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative flex flex-col justify-between"
                        >
                            <div className="absolute top-8 right-10 text-primary opacity-10 group-hover:opacity-20 transition-opacity">
                                <Quote size={40} />
                            </div>

                            <div>
                                <div className="flex gap-1 mb-6">
                                    {[...Array(testi.stars)].map((_, i) => (
                                        <Star key={i} className="text-primary fill-primary" size={14} />
                                    ))}
                                </div>

                                <p className="text-muted-foreground text-lg italic mb-8 leading-relaxed">
                                    "{testi.text}"
                                </p>
                            </div>

                            <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-serif text-xl font-bold">
                                        {testi.name.charAt(0)}
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-background border-2 border-primary rounded-full flex items-center justify-center font-bold text-[8px] text-primary">
                                        ✓
                                    </div>
                                </div>
                                <div>
                                    <p className="font-serif text-foreground text-lg leading-none mb-1.5">{testi.name}</p>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-primary/70 font-bold">{testi.tag}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
