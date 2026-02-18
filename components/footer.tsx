import Image from "next/image"
import { Instagram, Facebook, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card/50 border-t border-border/50 py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="relative w-20 h-20 mb-8 animate-mystic-float">
            <Image
              src="/images/logo.png"
              alt="Chavela Cocina Mexicana"
              fill
              className="object-contain"
            />
          </div>

          <h3 className="font-serif text-3xl text-foreground mb-2">Chavela</h3>
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-10 font-bold">
            Cocina Mexicana
          </p>

          {/* Social Links */}
          <div className="flex gap-6 mb-12">
            <a href="#" className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300">
              <Facebook size={20} />
            </a>
            <a href="https://wa.me/573000000000" className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300">
              <MessageCircle size={20} />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 w-full max-w-2xl">
            {["Inicio", "Menu", "Nosotros", "Contacto"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground hover:text-primary transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="w-16 h-px bg-primary/30 mb-8" />

          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
            &copy; 2026 Chavela Cocina Mexicana · Bogotá, Usaquén
          </p>
        </div>
      </div>

      {/* Elemento decorativo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </footer>
  )
}
