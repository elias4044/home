const ITEMS = [
  "Full-Stack Development",
  "✦",
  "Cybersecurity",
  "✦",
  "Next.js",
  "✦",
  "TypeScript",
  "✦",
  "Open Source",
  "✦",
  "Node.js",
  "✦",
  "UI Design",
  "✦",
  "Python",
  "✦",
  "React",
  "✦",
  "NoSQL",
  "✦",
  "System Design",
  "✦",
]

export function MarqueeStrip() {
  const repeated = [...ITEMS, ...ITEMS]

  return (
    <div className="relative overflow-hidden border-y border-border/20 py-5 bg-secondary/5">
      <div className="flex animate-marquee whitespace-nowrap will-change-transform">
        {repeated.map((item, i) => (
          <span
            key={i}
            className={`mx-6 font-mono text-xs tracking-widest uppercase ${
              item === "✦" ? "text-muted-foreground/30" : "text-muted-foreground/60"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
