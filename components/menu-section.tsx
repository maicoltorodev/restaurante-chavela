"use client"

import { useState } from "react"
import Image from "next/image"
import { Flame, Sparkles, ChefHat, ChevronLeft, ChevronRight } from "lucide-react"
import { Category, MenuItem } from "@/lib/cms/types"
import { formatPrice } from "@/lib/utils"

interface MenuSectionProps {
  initialCategories: Category[]
  initialMenuItems: MenuItem[]
}

export function MenuSection({ initialCategories, initialMenuItems }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>(
    initialCategories[0]?.id || ""
  )

  const activeCategoryName = initialCategories.find(c => c.id === activeCategory)?.name || ""
  const filteredItems = initialMenuItems.filter(item => item.category_id === activeCategory)

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
                const currentIndex = initialCategories.findIndex(c => c.id === activeCategory)
                const prevIndex = (currentIndex - 1 + initialCategories.length) % initialCategories.length
                setActiveCategory(initialCategories[prevIndex].id)
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
                {activeCategoryName}
              </h3>
            </div>

            <button
              onClick={() => {
                const currentIndex = initialCategories.findIndex(c => c.id === activeCategory)
                const nextIndex = (currentIndex + 1) % initialCategories.length
                setActiveCategory(initialCategories[nextIndex].id)
              }}
              className="p-3 text-primary hover:bg-primary/10 rounded-xl transition-colors active:scale-90"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Desktop Navigation (Pills) */}
          <div className="hidden md:flex justify-center gap-3 overflow-x-auto pb-4 no-scrollbar">
            {initialCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-8 py-4 text-xs uppercase tracking-[0.2em] font-bold transition-all duration-500 rounded-full border whitespace-nowrap shadow-sm group relative overflow-hidden ${activeCategory === cat.id
                  ? "bg-primary text-primary-foreground border-primary shadow-primary/20"
                  : "bg-card/50 border-border/50 text-muted-foreground hover:border-primary/40 hover:text-primary"
                  }`}
              >
                <span className="relative z-10">{cat.name}</span>
                {activeCategory === cat.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 group-hover:opacity-40 transition-opacity" />
                )}
              </button>
            ))}
          </div>

          {/* Indicators dots for mobile */}
          <div className="flex md:hidden justify-center gap-1.5 mt-6">
            {initialCategories.map((cat) => (
              <div
                key={cat.id}
                className={`h-1 rounded-full transition-all duration-500 ${activeCategory === cat.id ? "w-6 bg-primary" : "w-1.5 bg-border"}`}
              />
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 min-h-[50vh]">
            {filteredItems.map((item, i) => (
              <div
                key={item.id}
                className="group relative flex gap-6 p-4 sm:p-6 bg-background/50 hover:bg-card/30 rounded-3xl transition-all duration-500 items-start sm:items-center animate-fade-in border border-transparent hover:border-primary/10"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Image Container */}
                {item.image_url ? (
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden rounded-2xl shadow-lg shadow-black/20 group-hover:shadow-primary/20 transition-all duration-500">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 96px, 128px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                    <Flame size={24} className="text-primary/20" />
                  </div>
                )}

                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-serif text-lg sm:text-xl text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                          {item.name}
                        </h3>
                        {item.tag && (
                          <span className="text-[9px] uppercase tracking-[0.2em] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm shadow-primary/20">
                            {item.tag}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="font-serif text-lg sm:text-xl text-primary whitespace-nowrap">
                      ${formatPrice(item.price)}
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 sm:line-clamp-none text-balance">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center space-y-6 animate-fade-in">
            <div className="w-24 h-24 rounded-full bg-primary/5 flex items-center justify-center animate-pulse">
              <ChefHat size={40} className="text-primary/40" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-2xl text-foreground">Creando Magia...</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Nuestro chef está preparando nuevas experiencias para esta sección.
                Vuelve pronto para descubrir sabores inéditos.
              </p>
            </div>
          </div>
        )}

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
