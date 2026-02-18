import Image from "next/image"

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-tacos.jpg"
          alt="Tacos artesanales de Chavela"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes logo-float {
          0%, 100% { 
            transform: translateY(0) scale(1) rotate(-1deg); 
            filter: drop-shadow(0 0 10px rgba(255,255,255,0.05));
          }
          50% { 
            transform: translateY(-20px) scale(1.05) rotate(1deg); 
            filter: drop-shadow(0 0 30px var(--primary));
          }
        }
        .animate-logo-float {
          animation: logo-float 4s ease-in-out infinite;
        }
      `}} />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20 sm:pt-24">
        <div className="mb-6 sm:mb-8 flex justify-center animate-logo-float">
          <div className="relative w-[200px] h-[200px] sm:w-[280px] sm:h-[280px]">
            <Image
              src="/images/logo.png"
              alt="Chavela logo"
              fill
              className="drop-shadow-2xl hover:brightness-125 transition-all duration-500 cursor-pointer object-contain"
              priority
            />
          </div>
        </div>

        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl text-foreground mb-4 text-balance tracking-tight">
          Chavela
        </h1>
        <p className="text-primary text-lg sm:text-xl tracking-[0.3em] uppercase mb-8 font-light">
          Cocina Mexicana
        </p>
        <p className="font-serif text-xl sm:text-2xl text-muted-foreground italic mb-12 text-pretty">
          Taquitos de un mundo raro
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#menu"
            className="bg-primary text-primary-foreground px-8 py-4 text-sm uppercase tracking-[0.2em] hover:bg-primary/90 transition-all duration-300 rounded-sm"
          >
            Ver Menu
          </a>
          <a
            href="#contacto"
            className="border border-foreground/30 text-foreground px-8 py-4 text-sm uppercase tracking-[0.2em] hover:border-primary hover:text-primary transition-all duration-300 rounded-sm"
          >
            Reservaciones
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-primary/60" />
      </div>
    </section>
  )
}
