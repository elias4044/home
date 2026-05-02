export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-border/20 px-6 lg:px-16 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="font-black tracking-tighter text-foreground/10 select-none"
              style={{ fontSize: "clamp(40px, 8vw, 96px)", lineHeight: 0.9, letterSpacing: "-0.04em" }}
            >
              ELIAS
            </p>
          </div>

          <div className="flex flex-col gap-3 items-start sm:items-end">
            <div className="flex items-center gap-6 font-mono text-xs text-muted-foreground/50">
              <a href="https://github.com/elias4044" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground transition-colors">
                GitHub
              </a>
              <a href="https://x.com/elias4044_" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground transition-colors">
                Twitter
              </a>
              <a href="mailto:hello@elias4044.com" className="hover:text-muted-foreground transition-colors">
                Email
              </a>
            </div>
            <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground/30">
              <span>Built with Next.js, GSAP &amp; Tailwind</span>
              <span>&copy; {year} Elias Gulam</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

