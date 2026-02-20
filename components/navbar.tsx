"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Menu", href: "#menu" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Contacto", href: "#contacto" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Chavela Cocina Mexicana"
            width={48}
            height={48}
            className="rounded-full"
          />
          <span className="font-serif text-xl tracking-wide text-foreground hidden sm:block">
            Chavela
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="bg-primary text-primary-foreground px-5 py-2.5 text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors duration-300 rounded-sm"
          >
            Reservar
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-[70] w-12 h-12 flex items-center justify-center bg-primary/10 rounded-xl transition-all duration-300 active:scale-95 group"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <div className="flex flex-col gap-1.5 w-6 items-end">
            <span className={`h-0.5 bg-primary rounded-full transition-all duration-300 ${isOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
            <span className={`h-0.5 bg-primary rounded-full transition-all duration-300 ${isOpen ? "opacity-0" : "w-4"}`} />
            <span className={`h-0.5 bg-primary rounded-full transition-all duration-300 ${isOpen ? "w-6 -rotate-45 -translate-y-2" : "w-5"}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-background/98 backdrop-blur-2xl z-[60] transition-all duration-700 lg:hidden flex flex-col items-center justify-center ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        style={{ height: '100dvh' }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-primary pointer-events-none opacity-20" />

        <div className="flex flex-col items-center justify-center w-full gap-8 px-6 relative">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className={`mb-4 animate-mystic-float drop-shadow-[0_0_30px_rgba(244,63,94,0.4)] transition-all duration-1000 ${isOpen ? "scale-100 rotate-0" : "scale-50 rotate-12"}`}
          />

          <div className="flex flex-col items-center gap-6 sm:gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`font-serif text-4xl sm:text-5xl text-foreground hover:text-primary transition-all duration-700 transform ${isOpen ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  }`}
                style={{ transitionDelay: `${isOpen ? i * 100 + 300 : 0}ms` }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="https://wa.me/573000000000"
            target="_blank"
            className={`mt-10 bg-primary text-primary-foreground px-12 py-5 rounded-2xl font-bold uppercase tracking-[0.2em] transition-all duration-1000 shadow-2xl shadow-primary/30 flex items-center gap-3 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            style={{ transitionDelay: `${isOpen ? 700 : 0}ms` }}
          >
            Reservar Mesa
          </a>

          <div className={`mt-12 flex flex-col items-center gap-2 transition-all duration-1000 ${isOpen ? "opacity-100" : "opacity-0"} delay-700`}>
            <p className="text-[10px] uppercase tracking-[0.5em] text-primary font-bold text-center">
              Usaquén · Bogotá
            </p>
            <div className="w-12 h-px bg-primary/30" />
          </div>
        </div>
      </div>
    </nav>
  )
}
