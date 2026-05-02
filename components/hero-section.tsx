"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { LiveVisitorCount } from "@/components/live-visitor-count"
import { SwedenClock } from "@/components/sweden-clock"

gsap.registerPlugin(useGSAP)

const NAME = "ELIAS"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      // Pre-hide everything before first paint
      gsap.set(".hero-char", { yPercent: 115 })
      gsap.set(".hero-tag", { opacity: 0, y: 16 })
      gsap.set(".hero-desc", { opacity: 0, y: 20 })
      gsap.set(".hero-stat", { opacity: 0, y: 14 })
      gsap.set(".hero-footer", { opacity: 0 })

      // Animate TO final state
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to(".hero-char", {
          yPercent: 0,
          duration: 1.15,
          stagger: 0.045,
          delay: 0.8, // wait for curtain to lift
        })
        .to(
          ".hero-tag",
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
          "-=0.5"
        )
        .to(
          ".hero-desc",
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.45"
        )
        .to(
          ".hero-stat",
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          "-=0.5"
        )
        .to(
          ".hero-footer",
          { opacity: 1, duration: 0.5 },
          "-=0.3"
        )
    },
    { scope: sectionRef }
  )

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-between px-6 lg:px-16 pt-28 pb-12 overflow-hidden"
    >
      {/* Giant name */}
      <div className="flex-1 flex flex-col justify-end pb-10">
        <div className="flex leading-none select-none -ml-1 lg:-ml-2">
          {NAME.split("").map((char, i) => (
            <div key={i} className="overflow-hidden">
              <span
                className="hero-char inline-block font-black tracking-tighter text-foreground"
                style={{ fontSize: "clamp(80px, 21vw, 300px)", lineHeight: 0.88, letterSpacing: "-0.04em" }}
              >
                {char}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-8 h-px w-full bg-border/20" />

        {/* Subtitle row */}
        <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="hero-tag inline-flex items-center gap-1.5 rounded-full border border-border/30 bg-secondary/40 px-3 py-1 font-mono text-xs text-muted-foreground">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Available for projects
              </span>
              <span className="hero-tag inline-flex items-center gap-1.5 rounded-full border border-border/30 bg-secondary/40 px-3 py-1 font-mono text-xs text-muted-foreground">
                Based in Sweden
              </span>
            </div>
            <p className="hero-desc text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Full-stack developer & cybersecurity enthusiast.
              <br />
              Building secure systems and thoughtful interfaces.
            </p>
          </div>

          <div className="flex gap-10 md:gap-12">
            {[
              { value: "10+", label: "Projects Shipped" },
              { value: "15+", label: "Technologies" },
              { value: "3+", label: "Years Building" },
            ].map((stat) => (
              <div key={stat.label} className="hero-stat text-right">
                <div className="text-3xl md:text-4xl font-black text-foreground tabular-nums">
                  {stat.value}
                </div>
                <div className="mt-1 font-mono text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="hero-footer flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border/20 pt-6">
        <div className="flex items-center gap-6">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:gap-3 transition-all duration-300"
          >
            <span>View Projects</span>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#about"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            About me
          </a>
        </div>
        <div className="flex items-center gap-6">
          <LiveVisitorCount />
          <div className="hidden sm:block w-px h-6 bg-border/20" />
          <SwedenClock />
        </div>
      </div>
    </section>
  )
}
