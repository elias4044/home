"use client"

import { useEffect, useRef, useState } from "react"

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only show custom cursor on desktop
    const isTouchDevice = "ontouchstart" in window
    if (isTouchDevice) return

    let cursorX = 0
    let cursorY = 0
    let dotX = 0
    let dotY = 0

    const handleMouseMove = (e: MouseEvent) => {
      cursorX = e.clientX
      cursorY = e.clientY
      if (!visible) setVisible(true)
    }

    const handleMouseLeave = () => setVisible(false)
    const handleMouseEnter = () => setVisible(true)

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    const animate = () => {
      dotX += (cursorX - dotX) * 0.15
      dotY += (cursorY - dotY) * 0.15

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${dotX - 16}px, ${dotY - 16}px)`
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${cursorX - 3}px, ${cursorY - 3}px)`
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [visible])

  return (
    <>
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9999] h-8 w-8 rounded-full border border-primary/40 transition-opacity duration-300 mix-blend-difference hidden md:block ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />
      <div
        ref={cursorDotRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9999] h-1.5 w-1.5 rounded-full bg-primary transition-opacity duration-300 hidden md:block ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />
    </>
  )
}
