"use client"

import { useEffect, useState } from "react"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div
          className={`transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-4 py-2 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              Available for projects
            </span>
          </div>
        </div>

        <h1
          className={`mb-6 text-5xl font-bold leading-tight tracking-tight text-foreground transition-all duration-1000 delay-200 md:text-7xl lg:text-8xl ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <span className="text-balance">
            {"Hi, I'm "}
            <span className="glow-text text-primary">Elias</span>
          </span>
        </h1>

        <p
          className={`mx-auto mb-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground transition-all duration-1000 delay-400 md:text-xl ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          Full-stack developer with a growing focus on cybersecurity. 
          I build secure, scalable systems and thoughtful interfaces — designed to work beautifully and hold up under pressure.
        </p>

        <div
          className={`flex flex-wrap items-center justify-center gap-4 transition-all duration-1000 delay-600 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_rgba(100,210,220,0.3)]"
          >
            <span className="relative z-10">View Projects</span>
            <svg
              className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="absolute inset-0 bg-foreground/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 rounded-xl border border-border/50 bg-secondary/30 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-secondary/50"
          >
            About Me
          </a>
        </div>

        <div
          className={`mt-16 flex items-center justify-center gap-8 transition-all duration-1000 delay-800 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {[
            { label: "Projects", value: "10+" },
            { label: "Technologies", value: "15+" },
            { label: "Years Building", value: "3+" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div
          className={`flex flex-col items-center gap-2 transition-all duration-1000 delay-1000 ${mounted ? "opacity-100" : "opacity-0"
            }`}
        >
          <span className="text-xs text-muted-foreground">Scroll to explore</span>
          <div className="h-8 w-5 rounded-full border-2 border-muted-foreground/30 p-1">
            <div className="h-2 w-1.5 animate-bounce rounded-full bg-primary/60 mx-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}
