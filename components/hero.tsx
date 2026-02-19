"use client"

import Image from "next/image"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"

export function Hero() {
  const [clickCount, setClickCount] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()

  const handleLogoClick = () => {
    setClickCount((prev) => {
      const newCount = prev + 1

      if (newCount === 7) {
        router.push("/login")
        return 0
      }

      // Resetear si no hay clicks pronto
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setClickCount(0), 1000)

      return newCount
    })
  }

  return (
    <section id="inicio" className="relative min-h-[100vh] min-h-[100svh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="hidden sm:block absolute inset-0">
          <Image
            src="/images/hero-tacos.webp"
            alt="Tacos artesanales de Chavela"
            fill
            className="object-cover scale-110 animate-slow-zoom"
            priority
          />
        </div>
        <div className="block sm:hidden absolute inset-0">
          <Image
            src="/images/hero-taco-mobile.webp"
            alt="Tacos artesanales de Chavela"
            fill
            className="object-cover scale-110 animate-slow-zoom"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes slow-zoom {
          0% { transform: scale(1.1); }
          100% { transform: scale(1.2); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s linear infinite alternate;
        }
        @keyframes logo-float {
          0%, 100% { 
            transform: translateY(0) scale(1) rotate(-1deg); 
            filter: drop-shadow(0 0 10px rgba(255,255,255,0.05));
          }
          50% { 
            transform: translateY(-15px) scale(1.02) rotate(1deg); 
            filter: drop-shadow(0 0 30px var(--primary));
          }
        }
        .animate-logo-float {
          animation: logo-float 5s ease-in-out infinite;
        }
      `}} />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-16 sm:pt-24">
        <div className="mb-6 sm:mb-8 flex justify-center animate-logo-float">
          <div
            className="relative w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] select-none"
            onClick={handleLogoClick}
          >
            <Image
              src="/images/logo.png"
              alt="Chavela logo"
              fill
              className="drop-shadow-2xl hover:brightness-125 transition-all duration-500 cursor-pointer object-contain active:scale-95"
              priority
            />
          </div>
        </div>

        <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl text-foreground mb-4 tracking-tighter sm:tracking-tight">
          Chavela
        </h1>
        <p className="text-primary text-base sm:text-xl tracking-[0.4em] uppercase mb-6 sm:mb-8 font-bold">
          Cocina Mexicana
        </p>
        <p className="font-serif text-lg sm:text-2xl text-muted-foreground italic mb-10 sm:mb-12 text-pretty leading-relaxed">
          "Taquitos de un mundo raro"
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center px-4 sm:px-0">
          <a
            href="#menu"
            className="bg-primary text-primary-foreground px-8 py-4 sm:py-5 text-xs sm:text-sm uppercase tracking-[0.2em] font-bold hover:bg-primary/90 transition-all duration-300 rounded-xl sm:rounded-sm shadow-lg shadow-primary/20 text-center"
          >
            Explorar Menú
          </a>
          <a
            href="#contacto"
            className="backdrop-blur-md border border-foreground/30 text-foreground px-8 py-4 sm:py-5 text-xs sm:text-sm uppercase tracking-[0.2em] font-bold hover:border-primary hover:text-primary transition-all duration-300 rounded-xl sm:rounded-sm text-center"
          >
            Reservaciones
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-60">
        <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  )
}
