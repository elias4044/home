"use client"

// A very nice particle background effect using canvas and a bunch of math. 
// Feel free to use this in your own projects but please consider giving credit to me.

// I tried my best to make the code as clean and readable as possible in case you wanna read it.

import { useEffect, useRef, useCallback } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  baseOpacity: number
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

      if (particlesRef.current.length === 0) {
        initParticles(width, height)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      const { width, height } = dimensionsRef.current
      ctx.clearRect(0, 0, width, height)

      const particles = particlesRef.current
      const mouse = mouseRef.current

      for (const p of particles) {
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

      // Subtle connections near mouse only
      for (let i = 0; i < particles.length; i++) {
        const dx = mouse.x - particles[i].x
        const dy = mouse.y - particles[i].y
        const mouseDist = Math.sqrt(dx * dx + dy * dy)

        if (mouseDist < 120) {
          const opacity = (1 - mouseDist / 120) * 0.08
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(230, 225, 215, ${opacity})`
          ctx.lineWidth = 0.5
          ctx.stroke()

          // Connect nearby particles within mouse radius
          for (let j = i + 1; j < particles.length; j++) {
            const pDist = Math.sqrt(
              (particles[i].x - particles[j].x) ** 2 +
              (particles[i].y - particles[j].y) ** 2
            )
            const jMouseDist = Math.sqrt(
              (mouse.x - particles[j].x) ** 2 +
              (mouse.y - particles[j].y) ** 2
            )
            if (pDist < 100 && jMouseDist < 160) {
              const lineOpacity = (1 - pDist / 100) * 0.04
              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.strokeStyle = `rgba(230, 225, 215, ${lineOpacity})`
              ctx.lineWidth = 0.4
              ctx.stroke()
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationRef.current)
    }
  }, [initParticles])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  )
}
