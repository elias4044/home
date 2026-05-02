"use client"

import { useEffect, useState } from "react"
import { ref, onValue, runTransaction } from "firebase/database"
import { db } from "@/lib/firebase"

// Slugify a project title for use as a Firebase key
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

// Hook: subscribe to a project's view count (read-only)
export function useProjectViewCount(slug: string): number | null {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    if (!slug) return
    const r = ref(db, `project_views/${slug}`)
    const unsub = onValue(r, (snap) => {
      setCount(snap.exists() ? (snap.val() as number) : 0)
    })
    return () => unsub()
  }, [slug])

  return count
}

// Fire-and-forget increment — call once when the project link is clicked
export function incrementProjectView(slug: string): void {
  const r = ref(db, `project_views/${slug}`)
  runTransaction(r, (current) => (current ?? 0) + 1)
}
