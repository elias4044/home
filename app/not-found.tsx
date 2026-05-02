"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Minimal particle canvas — same visual DNA as node-canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf: number
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const PARTICLE_COUNT = 55
    type Particle = { x: number; y: number; vx: number; vy: number; r: number }
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255,255,255,0.35)"
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(255,255,255,${0.06 * (1 - dist / 120)})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      {/* Particle background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col justify-between px-6 lg:px-16 pt-10 pb-12 min-h-screen">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            elias4044.com
          </Link>
          <span className="font-mono text-xs text-muted-foreground/40">
            404
          </span>
        </div>

        {/* Giant 404 */}
        <div className="flex-1 flex flex-col justify-end pb-10 select-none">
          <div
            className="font-black tracking-tighter text-foreground leading-none -ml-1 lg:-ml-2"
            style={{
              fontSize: "clamp(120px, 28vw, 420px)",
              letterSpacing: "-0.05em",
              opacity: 0.08,
            }}
            aria-hidden="true"
          >
            404
          </div>

          <div className="mt-10 h-px w-full bg-border/20" />

          <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-xl">
              <p className="font-mono text-xs text-muted-foreground mb-5 uppercase tracking-widest">
                Page not found
              </p>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-tight mb-6"
                style={{ letterSpacing: "-0.03em" }}
              >
                You wandered
                <br />
                off the map.
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-sm">
                This URL doesn't exist. The page may have been moved, deleted,
                or never existed in the first place.
              </p>
            </div>

            <Link
              href="/"
              className="group inline-flex items-center gap-3 border border-border/40 hover:border-border/80 bg-secondary/30 hover:bg-secondary/60 px-6 py-4 rounded-xl transition-all duration-300 shrink-0 self-start md:self-auto"
            >
              <ArrowLeft className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="font-mono text-sm text-foreground">
                Back to home
              </span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-muted-foreground/30">
            elias4044 · Sweden
          </span>
          <span className="font-mono text-xs text-muted-foreground/30">
            {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </div>
  )
}
