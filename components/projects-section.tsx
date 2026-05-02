"use client"

import { useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useProjectViewCount, incrementProjectView, slugify } from "@/hooks/use-project-views"

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Individual row — has its own hook call for the view count
function ProjectRow({
  project,
  index,
  hovered,
  onHoverStart,
  onHoverEnd,
}: {
  project: Project
  index: number
  hovered: boolean
  onHoverStart: () => void
  onHoverEnd: () => void
}) {
  const slug = slugify(project.title)
  const views = useProjectViewCount(slug)
  const status = statusConfig[project.status]

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="project-row group relative flex items-start gap-6 md:gap-10 py-8 lg:py-10 border-t border-border/20 last:border-b cursor-pointer"
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onClick={() => incrementProjectView(slug)}
    >
      {/* Number */}
      <span className="pt-1 font-mono text-xs text-muted-foreground/40 w-8 shrink-0 select-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-4 mb-2">
          <h3
            className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-foreground transition-colors duration-300"
            style={{ letterSpacing: "-0.02em" }}
          >
            {project.title}
          </h3>
          <motion.div
            animate={{
              x: hovered ? 3 : 0,
              y: hovered ? -3 : 0,
              opacity: hovered ? 1 : 0.3,
            }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight className="h-5 w-5 text-foreground shrink-0" />
          </motion.div>
        </div>

        <AnimatePresence>
          {hovered && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="text-sm md:text-base text-muted-foreground leading-relaxed mt-3 max-w-2xl overflow-hidden"
            >
              {project.description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Meta */}
      <div className="hidden lg:flex flex-col items-end gap-3 shrink-0">
        <div className="flex flex-wrap justify-end gap-2 max-w-xs">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs text-muted-foreground/60 border border-border/20 px-2.5 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
          <span className="font-mono text-xs text-muted-foreground/50">{status.label}</span>
          <span className="font-mono text-xs text-muted-foreground/30">{project.year}</span>
          {views !== null && views > 0 && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-mono text-xs text-muted-foreground/30"
            >
              · {views.toLocaleString()} {views === 1 ? "click" : "clicks"}
            </motion.span>
          )}
        </div>
      </div>

      {/* Hover background */}
      <motion.div
        className="absolute inset-0 bg-foreground/2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.a>
  )
}

interface Project {
  title: string
  description: string
  tags: string[]
  link: string
  status: "live" | "in-progress" | "archived"
  year: string
}

const projects: Project[] = [
  {
    title: "Schoolsoft+",
    description:
      "A complete makeover of the digital school platform Schoolsoft for students. Fully rebuilt with a modern interface that integrates completely with the official Schoolsoft API, with an entire social network.",
    tags: ["HTML/CSS/JS", "Firebase", "Reverse Engineering"],
    link: "https://ssp.elias4044.com",
    status: "live",
    year: "2026",
  },
  {
    title: "Subway® Varberg",
    description: "The official website for Subway® Varberg franchise. Clean, fast, and mobile-first with menu, hours, and location.",
    tags: ["Next.js", "Tailwind CSS"],
    link: "https://subway-varberg.elias4044.com/",
    status: "live",
    year: "2026",
  },
  {
    title: "SlateUI",
    description:
      "A modular, event-driven Roblox framework built for developers who care about code quality. Clean API surface, zero external dependencies.",
    tags: ["Roblox", "Luau", "Next.js", "UI Docs"],
    link: "https://slateui.elias4044.com",
    status: "live",
    year: "2026",
  },
  {
    title: "Magma Enhanced",
    description:
      "An automated workflow extension for the Magma Matteappen application, built by reverse-engineering Magma's API. Adds smart features not available natively.",
    tags: ["Firebase", "Next.js", "Tailwind CSS", "Reverse Engineering"],
    link: "https://studentsmatteappen.vercel.app",
    status: "live",
    year: "2026",
  },
  {
    title: "BloxSentinel",
    description:
      "A roblox anti-cheat system built to scale. Provides cheat detection and prevention for all types of games, with a simple integration process and live monitoring dashboard.",
    tags: ["Node.js", "Discord.js", "Firebase"],
    link: "https://bloxsentinel.elias4044.com",
    status: "in-progress",
    year: "2026",
  },
]

const statusConfig = {
  live: { label: "Live", dot: "bg-emerald-500" },
  "in-progress": { label: "In Progress", dot: "bg-amber-500" },
  archived: { label: "Archived", dot: "bg-muted-foreground/40" },
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hovered, setHovered] = useState<number | null>(null)

  useGSAP(
    () => {
      gsap.from(".projects-label", {
        scrollTrigger: { trigger: ".projects-label", start: "top 88%" },
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: "power2.out",
      })

      gsap.from(".projects-heading", {
        scrollTrigger: { trigger: ".projects-heading", start: "top 85%" },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
      })

      gsap.from(".project-row", {
        scrollTrigger: { trigger: ".projects-list", start: "top 78%" },
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
      })
    },
    { scope: sectionRef }
  )

  return (
    <section id="projects" ref={sectionRef} className="px-6 lg:px-16 py-32 lg:py-48">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-20 lg:mb-28">
          <span className="projects-label block font-mono text-xs text-muted-foreground tracking-widest uppercase mb-4">
            02 — Work
          </span>
          <h2
            className="projects-heading font-black tracking-tighter text-foreground leading-none"
            style={{ fontSize: "clamp(56px, 11vw, 160px)", lineHeight: 0.9, letterSpacing: "-0.04em" }}
          >
            Selected<br />Projects
          </h2>
        </div>

        {/* Project list */}
        <div className="projects-list">
          {projects.map((project, i) => (
            <ProjectRow
              key={project.title}
              project={project}
              index={i}
              hovered={hovered === i}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
