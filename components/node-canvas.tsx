"use client"

// A very nice particle background effect using canvas and a bunch of math. 
// Feel free to use this in your own projects but please consider giving credit to me.

import { useEffect, useRef, useCallback } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  baseOpacity: number
  // burst particles decay and remove themselves
  life?: number       // 0..1, only set on burst particles
  maxLife?: number
}

export function NodeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)
  const dimensionsRef = useRef({ width: 0, height: 0 })

  const initParticles = useCallback((width: number, height: number) => {
    const count = Math.min(Math.floor((width * height) / 20000), 80)
    const particles: Particle[] = []
    for (let i = 0; i < count; i++) {
      const baseOpacity = Math.random() * 0.25 + 0.05
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1.5 + 0.5,
        opacity: baseOpacity,
        baseOpacity,
      })
    }
    particlesRef.current = particles
  }, [])

  // Spawn burst particles from a click position
  const spawnBurst = useCallback((x: number, y: number) => {
    const count = 22
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.3
      const speed = Math.random() * 3.5 + 1.2
      const maxLife = 80 + Math.random() * 60
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 2 + 0.8,
        opacity: 0.7 + Math.random() * 0.3,
        baseOpacity: 0,
        life: maxLife,
        maxLife,
      })
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      dimensionsRef.current = { width, height }

      if (particlesRef.current.filter(p => !p.life).length === 0) {
        initParticles(width, height)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handleMouseMove)

    const handleClick = (e: MouseEvent) => {
      spawnBurst(e.clientX, e.clientY)
    }
    window.addEventListener("click", handleClick)

    const animate = () => {
      const { width, height } = dimensionsRef.current
      ctx.clearRect(0, 0, width, height)

      const mouse = mouseRef.current

      // Separate base and burst particles
      const base: Particle[] = []
      const burst: Particle[] = []

      for (const p of particlesRef.current) {
        if (p.life !== undefined) burst.push(p)
        else base.push(p)
      }

      // --- Base particles ---
      for (const p of base) {
        p.x += p.vx
        p.y += p.vy

        if (p.x < -5) p.x = width + 5
        if (p.x > width + 5) p.x = -5
        if (p.y < -5) p.y = height + 5
        if (p.y > height + 5) p.y = -5

        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 160 && dist > 0) {
          const force = (160 - dist) / 160
          p.vx += (dx / dist) * force * 0.008
          p.vy += (dy / dist) * force * 0.008
          p.opacity = p.baseOpacity + force * 0.3
        } else {
          p.opacity += (p.baseOpacity - p.opacity) * 0.02
        }

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 0.8) {
          p.vx = (p.vx / speed) * 0.8
          p.vy = (p.vy / speed) * 0.8
        }
        p.vx *= 0.997
        p.vy *= 0.997

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(230, 225, 215, ${p.opacity})`
        ctx.fill()
      }

      // --- Connections near mouse ---
      for (let i = 0; i < base.length; i++) {
        const dx = mouse.x - base[i].x
        const dy = mouse.y - base[i].y
        const mouseDist = Math.sqrt(dx * dx + dy * dy)

        if (mouseDist < 120) {
          const opacity = (1 - mouseDist / 120) * 0.08
          ctx.beginPath()
          ctx.moveTo(base[i].x, base[i].y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(230, 225, 215, ${opacity})`
          ctx.lineWidth = 0.5
          ctx.stroke()

          for (let j = i + 1; j < base.length; j++) {
            const pDist = Math.sqrt(
              (base[i].x - base[j].x) ** 2 + (base[i].y - base[j].y) ** 2
            )
            const jMouseDist = Math.sqrt(
              (mouse.x - base[j].x) ** 2 + (mouse.y - base[j].y) ** 2
            )
            if (pDist < 100 && jMouseDist < 160) {
              const lineOpacity = (1 - pDist / 100) * 0.04
              ctx.beginPath()
              ctx.moveTo(base[i].x, base[i].y)
              ctx.lineTo(base[j].x, base[j].y)
              ctx.strokeStyle = `rgba(230, 225, 215, ${lineOpacity})`
              ctx.lineWidth = 0.4
              ctx.stroke()
            }
          }
        }
      }

      // --- Burst particles ---
      const aliveBurst: Particle[] = []
      for (const p of burst) {
        if (p.life === undefined || p.maxLife === undefined) continue
        p.life -= 1
        if (p.life <= 0) continue // dead — drop it

        // Decelerate and fade
        p.vx *= 0.93
        p.vy *= 0.93
        p.x += p.vx
        p.y += p.vy

        const progress = p.life / p.maxLife        // 1 → 0
        const fadeOpacity = p.opacity * (progress < 0.3 ? progress / 0.3 : 1) // fade out end
        const radius = p.radius * (0.4 + progress * 0.6)

        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(230, 225, 215, ${fadeOpacity * progress})`
        ctx.fill()

        // Draw lines between nearby burst particles
        for (const q of aliveBurst) {
          const d = Math.sqrt((p.x - q.x) ** 2 + (p.y - q.y) ** 2)
          if (d < 60) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(230, 225, 215, ${(1 - d / 60) * 0.12 * progress})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }

        aliveBurst.push(p)
      }

      // Rebuild particle list = base + alive burst
      particlesRef.current = [...base, ...aliveBurst]

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)
      cancelAnimationFrame(animationRef.current)
    }
  }, [initParticles, spawnBurst])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  )
}
