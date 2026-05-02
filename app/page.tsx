import { NodeCanvas } from "@/components/node-canvas"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { MarqueeStrip } from "@/components/marquee-strip"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { ConnectSection } from "@/components/connect-section"
import { Footer } from "@/components/footer"
import { MagneticCursor } from "@/components/magnetic-cursor"
import { ScrollProgress } from "@/components/scroll-progress"
import { PageCurtain } from "@/components/page-curtain"

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://elias4044.com/#person",
      name: "Elias Gulam",
      alternateName: "elias4044",
      url: "https://elias4044.com",
      sameAs: [
        "https://github.com/elias4044",
        "https://x.com/elias4044_",
      ],
      jobTitle: "Full-Stack Developer",
      description:
        "Full-stack developer and cybersecurity enthusiast based in Sweden. Building secure systems, thoughtful interfaces, and open-source tools with 10+ shipped projects.",
      knowsAbout: [
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "Tailwind CSS",
        "PostgreSQL",
        "Cybersecurity",
        "Git",
        "DevOps",
        "Python",
      ],
      address: {
        "@type": "PostalAddress",
        addressCountry: "SE",
      },
      email: "hello@elias4044.com",
    },
    {
      "@type": "WebSite",
      "@id": "https://elias4044.com/#website",
      url: "https://elias4044.com",
      name: "Elias Gulam — Portfolio",
      description:
        "Portfolio and home page of Elias Gulam, full-stack developer and cybersecurity enthusiast based in Sweden.",
      author: { "@id": "https://elias4044.com/#person" },
      inLanguage: "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": "https://elias4044.com/#page",
      url: "https://elias4044.com",
      name: "Elias Gulam — Full-Stack Developer & Cybersecurity Enthusiast",
      isPartOf: { "@id": "https://elias4044.com/#website" },
      about: { "@id": "https://elias4044.com/#person" },
      dateModified: "2026-05-02",
      inLanguage: "en-US",
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageCurtain />
      <ScrollProgress />
      <NodeCanvas />
      <MagneticCursor />
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <MarqueeStrip />
        <AboutSection />
        <MarqueeStrip />
        <ProjectsSection />
        <ConnectSection />
      </main>
      <Footer />
    </>
  )
}

