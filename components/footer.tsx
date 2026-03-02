export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/20 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {"elias4044.com"}
          </span>
        </div>

        <div className="flex items-center gap-6">
          <span className="font-mono text-xs text-muted-foreground">
            {"Built with Next.js & Tailwind CSS"}
          </span>
          <span className="text-xs text-muted-foreground/50">
            {"\u00A9 2026"}
          </span>
        </div>
      </div>
    </footer>
  )
}
