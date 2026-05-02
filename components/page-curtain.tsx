"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function PageCurtain() {
  const curtainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const curtain = curtainRef.current
    if (!curtain) return

    // Hold for one frame to let GSAP set() calls fire in all components,
    // then lift the curtain with a smooth slide-up.
    const tl = gsap.timeline({ delay: 0.05 })
    tl.to(curtain, {
      yPercent: -100,
      duration: 0.7,
      ease: "power3.inOut",
      onComplete: () => {
        curtain.style.display = "none"
      },
    })

    return () => { tl.kill() }
  }, [])

  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 z-99999 bg-background pointer-events-none"
      aria-hidden="true"
    />
  )
}
