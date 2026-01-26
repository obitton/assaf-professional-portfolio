import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { ProjectCards } from "@/components/project-cards"
import { Contact } from "@/components/contact"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <ProjectCards />
      <Contact />
    </main>
  )
}
