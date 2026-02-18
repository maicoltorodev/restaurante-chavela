import { MapPin, Clock, Phone, Instagram, Send } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contacto" className="py-20 sm:py-32 px-6 relative overflow-hidden bg-background">
      {/* Elementos decorativos de fondo similares a Nosotros */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 skew-x-12 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-20">
          <div className="max-w-2xl text-center sm:text-left">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full mb-6 text-center">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <p className="text-primary text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold">
                Visítanos
              </p>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl text-foreground leading-[1.1] text-balance">
              Te esperamos en el <span className="text-primary italic">corazón de Usaquén</span>
            </h2>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-[10px] sm:text-sm text-muted-foreground uppercase tracking-widest mb-4 font-bold">Reserva tu mesa</p>
            <a
              href="https://wa.me/573000000000"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-10 py-5 rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 w-full sm:w-auto font-bold uppercase tracking-widest text-xs"
            >
              <Send size={18} />
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 items-start">
          <div className="lg:col-span-1 space-y-6">
            <div className="group bg-card/50 backdrop-blur-sm border border-border/50 p-8 rounded-3xl hover:border-primary/40 transition-all duration-300">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-foreground mb-2">Ubicación</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    Calle 124 #15-84<br />
                    Local BBC, Bogotá<br />
                    Colombia
                  </p>
                </div>
              </div>
            </div>

            <div className="group bg-card/50 backdrop-blur-sm border border-border/50 p-8 rounded-3xl hover:border-primary/40 transition-all duration-300">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-foreground mb-2">Horario</h3>
                  <div className="text-muted-foreground space-y-2 text-sm sm:text-base font-medium">
                    <p className="flex justify-between gap-4"><span className="text-foreground/70">Lun - Jue:</span> 3:30 PM - 10:00 PM</p>
                    <p className="flex justify-between gap-4"><span className="text-foreground/70">Vie - Sab:</span> 2:30 PM - 11:00 PM</p>
                    <p className="flex justify-between gap-4"><span className="text-foreground/70">Dom:</span> 3:30 PM - 10:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group bg-card/50 backdrop-blur-sm border border-border/50 p-8 rounded-3xl hover:border-primary/40 transition-all duration-300">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  <Instagram size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-foreground mb-2">Social</h3>
                  <div className="space-y-1">
                    <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base">@chavela.cocina</a>
                    <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base">@chavela.tacos</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 relative">
            <div className="relative aspect-square sm:aspect-video lg:aspect-square xl:aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border border-border/50 group/map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127249.47765861094!2d-74.19716731093753!3d4.674681951002579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9b24cafa6b81%3A0xb6269049218b6808!2sChavela%20Cocina%20Mexicana!5e0!3m2!1ses-419!2sco!4v1771372376968!5m2!1ses-419!2sco"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Chavela Cocina Mexicana"
                className="grayscale contrast-125 opacity-90 group-hover/map:grayscale-0 group-hover/map:opacity-100 transition-all duration-1000"
              />
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-[2.5rem]" />
            </div>
            {/* Elemento decorativo sobre el mapa */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
