import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { MarqueeBanner } from "@/components/marquee-banner"
import { MenuSection } from "@/components/menu-section"
import { AboutSection } from "@/components/about-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { getCategories, getMenuItems, getApprovedTestimonials, getRestaurantInfo } from "@/lib/supabase/queries"

export default async function Home() {
  const [categories, menuItems, testimonials, info] = await Promise.all([
    getCategories(),
    getMenuItems(),
    getApprovedTestimonials(),
    getRestaurantInfo(),
  ])

  // Convertir array de info a objeto para fácil acceso
  const restaurantInfo = info.reduce((acc, curr) => ({
    ...acc,
    [curr.key]: curr.value
  }), {} as Record<string, string | null>)

  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <MarqueeBanner />
      <MenuSection initialCategories={categories} initialMenuItems={menuItems} />
      <AboutSection />
      <TestimonialsSection initialTestimonials={testimonials} />
      <MarqueeBanner />
      <ContactSection restaurantInfo={restaurantInfo} />
      <Footer restaurantInfo={restaurantInfo} />
    </main>
  )
}
