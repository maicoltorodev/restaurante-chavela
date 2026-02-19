"use client"

import { useState } from "react"
import Image from "next/image"
import { Flame, Sparkles, ChefHat, ChevronLeft, ChevronRight } from "lucide-react"
import { Category, MenuItem } from "@/lib/cms/types"

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {filteredItems.map((item, i) => (
            <div
              key={item.id}
              className="group relative flex gap-6 p-1 bg-background/50 hover:bg-card/30 rounded-3xl transition-all duration-500 items-center animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {item.image_url ? (
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 overflow-hidden rounded-2xl shadow-xl shadow-background/20 group-hover:shadow-primary/10 transition-all duration-700">
                  <Image
                    src={item.image_url}
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
                    ${Number(item.price).toLocaleString('es-CO')}
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
