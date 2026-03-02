"use client"

import { useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import { ExternalLink } from "lucide-react"

interface Project {
  title: string
  description: string
  tags: string[]
  link: string
  status: "live" | "in-progress" | "archived"
}

const projects: Project[] = [
  {
    title: "elias4044.com",
    description:
      "My personal home center and portfolio. The site you're on right now, built with Next.js, Tailwind CSS, and a custom interactive node canvas.",
    tags: ["Next.js", "Tailwind CSS", "Canvas API"],
    link: "https://elias4044.com",
    status: "live",
  },
  {
    title: "Portfolio",
    description:
      "My personal portfolio for people to learn more about me and my work. Built with Next.js & Tailwind CSS.",
    tags: ["React", "Node.js", "Tailwind CSS"],
    link: "https://portfolio.elias4044.com",
    status: "live",
  },
  {
    title: "Schoolsoft+",
    description:
      "A complete makeover of the digital school platform Schoolsoft+ for students, while completly integrating with the official Schoolsoft.",
    tags: ["HTML/CSS/JS", "Firebase", "Vercel Edge Functions"],
    link: "https://ssp.elias4044.com",
    status: "archived",
  },
  {
    title: "Launch Menu",
    description:
      "A simple and easy-to-use launch menu for Windows. Built with Electron, Node.js, and React.",
    tags: ["Node.js", "Electron", "React"],
    link: "https://github.com/elias4044/launch-menu",
    status: "archived",
  },
  {
    title: "EOAIZ",
    description:
      "A discord bot for easier role management. Local hosted & made for a discord developer buildathon.",
    tags: ["Node.js", "Discord.js", "Firebase"],
    link: "https://github.com/elias4044/eoaiz",
    status: "archived",
  },
  {
    title: "Magma Enhanced",
    description:
      "An automated way to use the Magma Matteappen application. Done by reverse engineering Magma and its API.",
    tags: ["Firebase", "Next.js", "Tailwind CSS"],
    link: "https://magma-enhanced.vercel.app",
    status: "in-progress",
  },
]

const statusConfig = {
  live: { label: "Live", color: "bg-emerald-500" },
  "in-progress": { label: "In Progress", color: "bg-amber-500" },
  archived: { label: "Archived", color: "bg-muted-foreground" },
}

export function ProjectsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="projects" className="relative px-6 py-32" ref={ref}>
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-16 flex items-center gap-4">
          <div
            className={`transition-all duration-700 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <span className="font-mono text-sm text-primary">{"// 02"}</span>
            <h2 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">
              Projects
            </h2>
          </div>
          <div
            className={`hidden h-px flex-1 bg-border/30 md:block transition-all duration-1000 delay-300 ${
              isInView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
            style={{ transformOrigin: "left" }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const status = statusConfig[project.status]
            return (
              <a
                key={project.title}
                href={project.link}
                target={project.link !== "#" ? "_blank" : undefined}
                rel={project.link !== "#" ? "noopener noreferrer" : undefined}
                className={`group relative rounded-2xl border border-border/30 bg-card/40 p-6 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:bg-card/60 hover:shadow-[0_0_40px_rgba(100,210,220,0.08)] ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: isInView ? `${200 + i * 100}ms` : "0ms" }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${status.color}`} />
                    <span className="font-mono text-xs text-muted-foreground">
                      {status.label}
                    </span>
                  </div>
                  <ExternalLink
                    className={`h-4 w-4 text-muted-foreground transition-all duration-300 ${
                      hoveredIndex === i
                        ? "text-primary translate-x-0.5 -translate-y-0.5"
                        : ""
                    }`}
                  />
                </div>

                <h3 className="mb-2 text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                  {project.title}
                </h3>

                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-secondary/40 px-2 py-1 font-mono text-xs text-muted-foreground transition-colors duration-300 group-hover:bg-primary/10 group-hover:text-primary/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {hoveredIndex === i && (
                  <div className="absolute inset-0 rounded-2xl bg-primary/5 pointer-events-none" />
                )}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
