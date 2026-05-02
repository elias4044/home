"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const tween = gsap.to(bar, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-9998 h-0.5 pointer-events-none">
      {/* Track */}
      <div className="absolute inset-0 bg-border/10" />
      {/* Fill */}
      <div
        ref={barRef}
        className="absolute inset-0 origin-left bg-foreground/50"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  )
}
