"use client"

import { useState } from "react"
import Image from "next/image"
import { Flame, Sparkles, ChefHat, ChevronLeft, ChevronRight } from "lucide-react"

const categories = ["Botanas", "Tacos", "Para Compartir", "Quesadillas", "Fuertes", "Cócteles", "Bebidas"] as const

type Category = typeof categories[number]

interface MenuItem {
  name: string
  description: string
  price: string
  image?: string
  tag?: string
}

const menuItems: Record<Category, MenuItem[]> = {
  Botanas: [
    {
      name: "Totopos",
      description: "Totopos acompañados de guacamole fresco",
      price: "$8.900",
      image: "/images/menu/botana_totopos.webp",
    },
    {
      name: "Empanadas",
      description: "4 empanadas de carne y papa acompañadas con ají de la casa",
      price: "$16.000",
      image: "/images/menu/botana_empanadas.webp",
    },
    {
      name: "Papas con Queso",
      description: "Papas a la francesa bañadas en queso cheddar y guacamole",
      price: "$12.900",
      image: "/images/menu/botana_papas_queso.webp",
    },
    {
      name: "Papas Chavela",
      description: "Papas a la francesa con birria de res, queso cheddar y guacamole",
      price: "$24.900",
      image: "/images/menu/botana_papas_chavela.webp",
      tag: "Especial",
    },
    {
      name: "Fridas de Birria (Flautas)",
      description: "16 deditos rellenos de carne de birria, acompañados de guacamole, frijol refrito y salsa verde",
      price: "$21.900",
      image: "/images/menu/botana_fridas.webp",
    },
    {
      name: "Guacamole con Chicharrón",
      description: "Guacamole fresco acompañado de chicharrón al estilo Monterrey y totopos",
      price: "$24.900",
      image: "/images/menu/botana_guacamole_chicharron.webp",
    },
    {
      name: "Ignacios (Nachos)",
      description: "Totopos con birria de res, queso mozzarella gratinado, guacamole y cebolla encurtida",
      price: "$32.000",
      image: "/images/menu/botana_nachos.webp",
    },
    {
      name: "Burguestias",
      description: "3 mini hamburguesas en pan de papa con guacamole y queso mozzarella",
      price: "$29.900",
      image: "/images/menu/botana_burguestias.webp",
    },
    {
      name: "Pizza Birria",
      description: "Tortilla de harina rellena de carne de birria, queso mozzarella y caldo",
      price: "$42.900",
      image: "/images/menu/botana_pizza_birria.webp",
    },
  ],
  Tacos: [
    {
      name: "Rivera",
      description: "Cerdo al pastor adobado por 24 horas en chiles y especias",
      price: "$21.000",
      image: "/images/menu/taco_pastor.webp",
      tag: "3 Unidades",
    },
    {
      name: "Birria de Res",
      description: "Carne de res desmechada, marinada en adobo de chiles, tomates y especias",
      price: "$21.000",
      image: "/images/menu/taco_birria.webp",
      tag: "3 Unidades",
    },
    {
      name: "Chicharrón",
      description: "Panceta de cerdo cocinada al estilo Monterrey con guacamole y cebolla roja encurtida",
      price: "$21.000",
      image: "/images/menu/taco_chicharron.webp",
      tag: "3 Unidades",
    },
    {
      name: "Quesabirria",
      description: "Taco de birria con queso mozzarella fundido",
      price: "$24.000",
      image: "/images/menu/taco_quesabirria.webp",
      tag: "3 Unidades",
    },
  ],
  "Para Compartir": [
    {
      name: "Taquiza para Compartir",
      description: "Selección de 2 tacos de pastor (Rivera), 2 de birria y 2 de chicharrón",
      price: "$40.000",
      image: "/images/menu/compartir_taquiza.webp",
      tag: "Ideal 2-3 pers",
    },
  ],
  Quesadillas: [
    {
      name: "Queso Mozzarella",
      description: "Quesadilla de queso mozzarella, acompañada de guacamole y frijol refrito",
      price: "$12.900",
      image: "/images/menu/quesadilla_mozzarella.webp",
    },
    {
      name: "Rivera",
      description: "Cerdo al pastor con queso mozzarella, acompañada de guacamole y frijol refrito",
      price: "$16.900",
      image: "/images/menu/quesadilla_pastor.webp",
    },
    {
      name: "Chicharrón",
      description: "Panceta de cerdo al estilo Monterrey con mozzarella, guacamole y frijol refrito",
      price: "$16.900",
      image: "/images/menu/quesadilla_chicharron.webp",
    },
  ],
  Fuertes: [
    {
      name: "Burrito de Birria",
      description: "Relleno de arroz, mozzarella y frijol refrito, con birria de res, guacamole y suero costeño",
      price: "$27.900",
      image: "/images/menu/fuerte_burrito_birria.webp",
    },
    {
      name: "Burrito Cerdo al Pastor",
      description: "Relleno de arroz, mozzarella y frijol refrito, con cerdo al pastor, guacamole y suero costeño",
      price: "$27.900",
      image: "/images/menu/fuerte_burrito_pastor.webp",
    },
  ],
  "Cócteles": [
    {
      name: "Adiós Paloma",
      description: "Tequila blanco, soda de pomelo, sirope de agave y zumo de limón",
      price: "$23.900",
      image: "/images/menu/coctel_adios_paloma.webp",
    },
    {
      name: "Piña Chavelada",
      description: "Ron, mermelada de piña, sirope de coco, zumo de limón y naranja",
      price: "$22.900",
      image: "/images/menu/coctel_pina_chavelada.webp",
    },
    {
      name: "Gracias a la Vida",
      description: "Tequila blanco, infusión de arándanos, horchata, hierbabuena y zumo de limón",
      price: "$22.900",
      image: "/images/menu/coctel_gracias_vida.webp",
    },
    {
      name: "La Frida de Chavela",
      description: "Margarita de autor: Tequila blanco, miel de agave y zumo de limón",
      price: "$21.900",
      image: "/images/menu/coctel_frida_chavela.webp",
    },
    {
      name: "Lulo Tonic",
      description: "Tequila blanco, lulo fresco, tónica y zumo de limón",
      price: "$23.900",
      image: "/images/menu/coctel_lulo_tonic.webp",
    },
    {
      name: "Penicillín Chicano",
      description: "Tequila blanco, aperol, mermelada de jengibre, hierbabuena y zumo de limón",
      price: "$23.900",
      image: "/images/menu/coctel_penicillin.webp",
    },
  ],
  Bebidas: [
    {
      name: "Coca-Cola",
      description: "Sabor original en presentación personal",
      price: "$5.900",
      image: "/images/menu/bebida_cocacola.webp",
    },
    {
      name: "Agua Mineral",
      description: "Agua pura de manantial con o sin gas",
      price: "$4.900",
      image: "/images/menu/bebida_agua_mineral.webp",
    },
    {
      name: "Limonada de Coco",
      description: "Refrescante mezcla de limón y crema de coco",
      price: "$7.900",
      image: "/images/menu/bebida_limonada_coco.webp",
    },
    {
      name: "Soda de Maracuyá",
      description: "Soda artesanal con pulpa natural de maracuyá",
      price: "$12.900",
      image: "/images/menu/bebida_soda_maracuya.webp",
    },
    {
      name: "Soda Jengibre y Limón",
      description: "Soda refrescante de la casa con jengibre y limón",
      price: "$12.900",
      image: "/images/menu/bebida_soda_jengibre_limon.webp",
    },
    {
      name: "Soda de Frutos Rojo",
      description: "Mezcla artesanal de moras, fresas y arándanos",
      price: "$12.900",
      image: "/images/menu/bebida_soda_frutos_rojos.webp",
    },
  ],
}

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("Tacos")

  return (
    <section id="menu" className="py-32 px-6 bg-background relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-1/4 h-full bg-primary/5 -skew-x-12 -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Sparkles className="text-primary animate-pulse" size={14} />
              <p className="text-primary text-xs uppercase tracking-[0.3em] font-bold">
                Categorías Reales
              </p>
            </div>
            <h2 className="font-serif text-5xl sm:text-7xl text-foreground leading-[1.1] text-balance">
              Nuestra <span className="text-primary italic">Carta</span>
            </h2>
          </div>
          <div className="hidden lg:flex items-center gap-4 text-muted-foreground italic">
            <ChefHat size={20} className="text-primary" />
            <p>Sabor auténtico colombo-mexicano</p>
          </div>
        </div>

        {/* Categorías Navigation */}
        <div className="relative mb-16">
          {/* Mobile Navigation (Arrows) */}
          <div className="flex md:hidden items-center justify-between gap-4 px-4 py-2 bg-card/30 backdrop-blur-sm rounded-2xl border border-border/50 shadow-lg">
            <button
              onClick={() => {
                const currentIndex = categories.indexOf(activeCategory)
                const prevIndex = (currentIndex - 1 + categories.length) % categories.length
                setActiveCategory(categories[prevIndex])
              }}
              className="p-3 text-primary hover:bg-primary/10 rounded-xl transition-colors active:scale-90"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex-1 text-center overflow-hidden">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-1 animate-pulse">
                Explorar Carta
              </p>
              <h3 key={activeCategory} className="font-serif text-2xl text-foreground whitespace-nowrap overflow-hidden text-ellipsis animate-fade-in">
                {activeCategory}
              </h3>
            </div>

            <button
              onClick={() => {
                const currentIndex = categories.indexOf(activeCategory)
                const nextIndex = (currentIndex + 1) % categories.length
                setActiveCategory(categories[nextIndex])
              }}
              className="p-3 text-primary hover:bg-primary/10 rounded-xl transition-colors active:scale-90"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Desktop Navigation (Pills) */}
          <div className="hidden md:flex justify-center gap-3 overflow-x-auto pb-4 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-4 text-xs uppercase tracking-[0.2em] font-bold transition-all duration-500 rounded-full border whitespace-nowrap shadow-sm group relative overflow-hidden ${activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-primary/20"
                  : "bg-card/50 border-border/50 text-muted-foreground hover:border-primary/40 hover:text-primary"
                  }`}
              >
                <span className="relative z-10">{cat}</span>
                {activeCategory === cat && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 group-hover:opacity-40 transition-opacity" />
                )}
              </button>
            ))}
          </div>

          {/* Indicators dots for mobile */}
          <div className="flex md:hidden justify-center gap-1.5 mt-6">
            {categories.map((cat) => (
              <div
                key={cat}
                className={`h-1 rounded-full transition-all duration-500 ${activeCategory === cat ? "w-6 bg-primary" : "w-1.5 bg-border"}`}
              />
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {menuItems[activeCategory].map((item, i) => (
            <div
              key={item.name}
              className="group relative flex gap-6 p-1 bg-background/50 hover:bg-card/30 rounded-3xl transition-all duration-500 items-center animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {item.image ? (
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 overflow-hidden rounded-2xl shadow-xl shadow-background/20 group-hover:shadow-primary/10 transition-all duration-700">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ) : (
                <div className="w-16 sm:w-20 flex-shrink-0 flex items-center justify-center">
                  <Flame size={32} className="text-primary opacity-20 group-hover:opacity-60 transition-opacity" />
                </div>
              )}

              <div className="flex-1 pr-4 py-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-serif text-xl sm:text-2xl text-foreground group-hover:text-primary transition-colors duration-300">
                      {item.name}
                    </h3>
                    {item.tag && (
                      <span className="text-[9px] uppercase tracking-[0.2em] font-bold bg-primary/10 text-primary border border-primary/20 px-2.5 py-1 rounded-full whitespace-nowrap">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <div className="font-serif text-xl text-primary whitespace-nowrap group-hover:scale-110 transition-transform origin-right">
                    {item.price}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed line-clamp-2 sm:line-clamp-none">
                  {item.description}
                </p>

                {/* Decorative dots for price connector (visible on larger screens) */}
                <div className="hidden sm:block absolute bottom-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Hover highlight line */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-primary group-hover:h-1/2 transition-all duration-500 rounded-full" />
            </div>
          ))}
        </div>

        {/* Bottom CTA or Decoration */}
        <div className="mt-24 text-center">
          <div className="inline-block p-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent w-full h-px mb-8" />
          <p className="text-muted-foreground italic font-serif text-lg">
            * Consulta disponibilidad de temporada con tu mesero
          </p>
        </div>
      </div>
    </section>
  )
}
