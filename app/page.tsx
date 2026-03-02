import { NodeCanvas } from "@/components/node-canvas"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { ConnectSection } from "@/components/connect-section"
import { Footer } from "@/components/footer"
import { MagneticCursor } from "@/components/magnetic-cursor"

export default function HomePage() {
  return (
    <>
      <NodeCanvas />
      <MagneticCursor />
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ConnectSection />
      </main>
      <Footer />
    </>
  )
}
