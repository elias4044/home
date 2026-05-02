"use client"

import { useEffect, useRef, useState } from "react"
import { ref, onValue, set, onDisconnect, serverTimestamp } from "firebase/database"
import { db } from "@/lib/firebase"
import { motion, AnimatePresence } from "framer-motion"

// Generate or retrieve a persistent session ID
function getSessionId(): string {
  if (typeof window === "undefined") return ""
  let id = sessionStorage.getItem("visitor_sid")
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36)
    sessionStorage.setItem("visitor_sid", id)
  }
  return id
}

export function LiveVisitorCount() {
  const [count, setCount] = useState<number | null>(null)
  const [prevCount, setPrevCount] = useState<number | null>(null)
  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    const sid = getSessionId()
    if (!sid) return

    const presenceRef = ref(db, `visitors/${sid}`)
    const visitorsRef = ref(db, "visitors")

    // Register presence
    set(presenceRef, { online: true, ts: Date.now() })
    onDisconnect(presenceRef).set({ online: false, ts: Date.now() })

    // Count online visitors
    const unsub = onValue(visitorsRef, (snap) => {
      if (!snap.exists()) {
        setCount(1)
        return
      }
      let online = 0
      snap.forEach((child) => {
        if (child.val()?.online === true) online++
      })
      setCount((prev) => {
        setPrevCount(prev)
        return online
      })
    })

    cleanupRef.current = () => {
      unsub()
      set(presenceRef, { online: false, ts: Date.now() })
    }

    return () => cleanupRef.current?.()
  }, [])

  if (count === null) return null

  return (
    <div className="flex items-center gap-2">
      {/* Pulsing dot */}
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>

      <span className="font-mono text-xs text-muted-foreground">
        <AnimatePresence mode="wait">
          <motion.span
            key={count}
            initial={{ opacity: 0, y: prevCount !== null && count > prevCount ? -8 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prevCount !== null && count > prevCount ? 8 : -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="inline-block tabular-nums"
          >
            {count}
          </motion.span>
        </AnimatePresence>
        <span className="ml-1">{count === 1 ? "person" : "people"} online</span>
      </span>
    </div>
  )
}
