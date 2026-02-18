"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Menu", href: "#menu" },
  { label: "Nosotros", href: "#nosotros" },
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
          className="md:hidden text-foreground p-2 hover:text-primary transition-colors"
          aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-background/98 backdrop-blur-xl z-[60] transition-all duration-500 lg:hidden ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6 relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-2 text-primary hover:scale-110 transition-transform"
          >
            <X size={36} />
          </button>

          <Image
            src="/images/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="mb-4 animate-mystic-float drop-shadow-[0_0_15px_rgba(244,63,94,0.3)]"
          />

          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`font-serif text-4xl text-foreground hover:text-primary transition-all duration-500 transform ${isOpen ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                }`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              {link.label}
            </a>
          ))}

          <a
            href="https://wa.me/573000000000"
            target="_blank"
            className={`mt-10 bg-primary text-primary-foreground px-12 py-5 rounded-2xl font-bold uppercase tracking-widest transition-all duration-700 shadow-2xl shadow-primary/20 ${isOpen ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            style={{ transitionDelay: "600ms" }}
          >
            Reservar Ahora
          </a>

          <p className="absolute bottom-10 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Chavela Usaquén · Bogotá
          </p>
        </div>
      </div>
    </nav>
  )
}
