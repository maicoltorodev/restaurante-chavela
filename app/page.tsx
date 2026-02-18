import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { MarqueeBanner } from "@/components/marquee-banner"
import { MenuSection } from "@/components/menu-section"
import { AboutSection } from "@/components/about-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <MarqueeBanner />
      <MenuSection />
      <AboutSection />
      <TestimonialsSection />
      <MarqueeBanner />
      <ContactSection />
      <Footer />
    </main>
  )
}
