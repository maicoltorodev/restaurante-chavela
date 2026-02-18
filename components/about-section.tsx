import Image from "next/image"
import { Utensils, Award, Users } from "lucide-react"

export function AboutSection() {
  return (
    <section id="nosotros" className="py-32 px-6 bg-background relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden z-10 shadow-2xl">
              <Image
                src="/images/restaurant-interior.jpg"
                alt="Interior del restaurante Chavela en Usaquén"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Marcos decorativos flotantes */}
            <div className="absolute -bottom-10 -right-10 w-2/3 h-2/3 border-2 border-primary/20 rounded-2xl -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-primary/10 rounded-full blur-2xl animate-pulse" />

            {/* Badge de experiencia */}
            <div className="absolute -bottom-4 -left-4 bg-primary p-6 rounded-xl shadow-xl z-20 hidden md:block animate-mystic-float">
              <p className="text-primary-foreground font-serif text-4xl font-bold leading-none mb-1">Fusión</p>
              <p className="text-primary-foreground/80 text-xs uppercase tracking-[0.2em]">Colombo-Mexicana</p>
            </div>
          </div>

          <div className="relative">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-ping" />
              <p className="text-primary text-xs uppercase tracking-[0.3em] font-bold">
                Nuestra Esencia
              </p>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl text-foreground mb-8 leading-[1.1] text-balance">
              Tradición reinventada en el <span className="text-primary italic">corazón de Usaquén</span>
            </h2>

            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed max-w-xl">
              <p>
                <strong className="text-foreground">Chavela Cocina Mexicana</strong> ha consolidado su trayectoria en Bogotá como un referente de la <span className="text-primary font-medium">"fusión colombo-mexicana"</span>.
              </p>
              <p>
                Destacándonos por nuestra constante evolución, hemos transformado una propuesta inicial de antojitos tradicionales en un concepto de <strong className="text-foreground whitespace-nowrap">restaurante contemporáneo</strong> único en el sector histórico de Usaquén.
              </p>
              <p>
                Cada plato es un diálogo entre dos culturas, utilizando técnicas ancestrales mexicanas con la frescura de los mejores ingredientes locales.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="flex flex-col items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center text-primary group-hover:bg-primary transition-colors">
                  <Utensils size={20} />
                </div>
                <div>
                  <p className="font-serif text-xl text-foreground">+40</p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Platos Únicos</p>
                </div>
              </div>

              <div className="flex flex-col items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center text-primary">
                  <Award size={20} />
                </div>
                <div>
                  <p className="font-serif text-xl text-foreground">Top #1</p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Usaquén</p>
                </div>
              </div>

              <div className="flex flex-col items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center text-primary">
                  <Users size={20} />
                </div>
                <div>
                  <p className="font-serif text-xl text-foreground">100%</p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Artesanal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

