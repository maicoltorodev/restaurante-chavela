import Image from "next/image"
import { Utensils, Award, Users } from "lucide-react"

export function AboutSection() {
  return (
    <section id="nosotros" className="py-20 sm:py-32 px-6 bg-background relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 items-center">
          <div className="relative group">
            <div className="relative aspect-[4/5] sm:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden z-10 shadow-2xl">
              <Image
                src="/images/restaurant-interior.jpg"
                alt="Interior del restaurante Chavela en Usaquén"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Marcos decorativos flotantes */}
            <div className="absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 w-2/3 h-2/3 border-2 border-primary/20 rounded-2xl -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-primary/10 rounded-full blur-2xl animate-pulse" />

            {/* Badge de experiencia */}
            <div className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 bg-primary p-5 sm:p-8 rounded-2xl shadow-2xl z-20 animate-mystic-float">
              <p className="text-primary-foreground font-serif text-3xl sm:text-5xl font-bold leading-none mb-1">Fusión</p>
              <p className="text-primary-foreground/90 text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold">Colombo-Mexicana</p>
            </div>
          </div>

          <div className="relative pt-8 sm:pt-0">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <p className="text-primary text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold">
                Nuestra Esencia
              </p>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl text-foreground mb-8 leading-[1.1] text-balance">
              Tradición reinventada en el <span className="text-primary italic font-medium underline decoration-primary/20 underline-offset-8">corazón de Usaquén</span>
            </h2>

            <div className="space-y-6 text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl">
              <p>
                <strong className="text-foreground">Chavela Cocina Mexicana</strong> ha consolidado su trayectoria en Bogotá como un referente de la <span className="text-primary font-bold">"fusión colombo-mexicana"</span>.
              </p>
              <p>
                Destacándonos por nuestra constante evolución, hemos transformado nuestra propuesta en un concepto de <strong className="text-foreground italic">restaurante contemporáneo</strong> único en el sector histórico de Usaquén.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
              <div className="flex flex-col items-start gap-3 p-4 bg-card/50 rounded-2xl border border-border/50 hover:border-primary/30 transition-colors group/stat">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover/stat:bg-primary group-hover/stat:text-primary-foreground transition-all duration-300">
                  <Utensils size={18} />
                </div>
                <div>
                  <p className="font-serif text-2xl text-foreground">+40</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Platos</p>
                </div>
              </div>

              <div className="flex flex-col items-start gap-3 p-4 bg-card/50 rounded-2xl border border-border/50 hover:border-primary/30 transition-colors group/stat">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover/stat:bg-primary group-hover/stat:text-primary-foreground transition-all duration-300">
                  <Award size={18} />
                </div>
                <div>
                  <p className="font-serif text-2xl text-foreground">Top #1</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Usaquén</p>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex flex-row sm:flex-col items-center sm:items-start gap-4 sm:gap-3 p-4 bg-card/50 rounded-2xl border border-border/50 hover:border-primary/30 transition-colors group/stat">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover/stat:bg-primary group-hover/stat:text-primary-foreground transition-all duration-300">
                  <Users size={18} />
                </div>
                <div className="flex-1">
                  <p className="font-serif text-2xl text-foreground">100%</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Artesanal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

