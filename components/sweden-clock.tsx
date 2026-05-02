"use client"

import { useEffect, useRef, useState } from "react"

function getSwedenTime() {
  const now = new Date()
  const str = now.toLocaleTimeString("sv-SE", {
    timeZone: "Europe/Stockholm",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
  const [h, m, s] = str.split(":").map(Number)
  return { h, m, s }
}

function getTimeOfDay(h: number): { label: string; color: string } {
  if (h >= 5 && h < 9) return { label: "Early morning", color: "oklch(0.75 0.08 60)" }
  if (h >= 9 && h < 12) return { label: "Morning", color: "oklch(0.80 0.10 80)" }
  if (h >= 12 && h < 14) return { label: "Midday", color: "oklch(0.85 0.08 90)" }
  if (h >= 14 && h < 17) return { label: "Afternoon", color: "oklch(0.75 0.07 50)" }
  if (h >= 17 && h < 20) return { label: "Evening", color: "oklch(0.65 0.08 30)" }
  if (h >= 20 && h < 23) return { label: "Night", color: "oklch(0.55 0.05 270)" }
  return { label: "Late night", color: "oklch(0.40 0.04 270)" }
}

export function SwedenClock() {
  const [time, setTime] = useState<{ h: number; m: number; s: number } | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    setTime(getSwedenTime())
  }, [])

  useEffect(() => {
    if (!time) return
    const interval = setInterval(() => setTime(getSwedenTime()), 1000)
    return () => clearInterval(interval)
  }, [time])

  // Draw the arc-clock on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !time) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const size = 56
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)

    const cx = size / 2
    const cy = size / 2
    const r = size / 2 - 3

    ctx.clearRect(0, 0, size, size)

    // Track ring
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.strokeStyle = "rgba(255,255,255,0.06)"
    ctx.lineWidth = 1.5
    ctx.stroke()

    const { color } = getTimeOfDay(time.h)

    // Hour arc
    const hAngle = ((time.h % 12) / 12 + time.m / 720) * Math.PI * 2 - Math.PI / 2
    ctx.beginPath()
    ctx.arc(cx, cy, r, -Math.PI / 2, hAngle)
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.stroke()

    // Minute dot
    const mAngle = (time.m / 60) * Math.PI * 2 - Math.PI / 2
    const mx = cx + r * Math.cos(mAngle)
    const my = cy + r * Math.sin(mAngle)
    ctx.beginPath()
    ctx.arc(mx, my, 2.5, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(255,255,255,0.7)"
    ctx.fill()

    // Second arc (outer ring, thin)
    const sAngle = (time.s / 60) * Math.PI * 2 - Math.PI / 2
    ctx.beginPath()
    ctx.arc(cx, cy, r - 6, -Math.PI / 2, sAngle)
    ctx.strokeStyle = "rgba(255,255,255,0.15)"
    ctx.lineWidth = 1
    ctx.lineCap = "round"
    ctx.stroke()

    // Center dot
    ctx.beginPath()
    ctx.arc(cx, cy, 1.5, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(255,255,255,0.3)"
    ctx.fill()
  }, [time])

  if (!time) return null

  const { h, m, s } = time
  const { label, color } = getTimeOfDay(h)
  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <div className="flex items-center gap-4">
      <canvas ref={canvasRef} aria-hidden="true" />
      <div>
        <div
          className="font-mono text-lg font-bold tabular-nums leading-none"
          style={{ color }}
        >
          {pad(h)}:{pad(m)}
          <span className="text-xs opacity-40 ml-1">{pad(s)}</span>
        </div>
        <div className="mt-1 font-mono text-xs text-muted-foreground/50">
          {label} · Sweden
        </div>
      </div>
    </div>
  )
}
