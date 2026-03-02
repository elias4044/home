"use client"

import { useInView } from "@/hooks/use-in-view"
import { Github, Twitter, Mail, Linkedin, Globe } from "lucide-react"

const socials = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/elias4044",
    description: "Check out my code",
    handle: "@elias4044",
  },
  {
    name: "X / Twitter",
    icon: Twitter,
    href: "https://x.com/elias4044_",
    description: "Follow my thoughts",
    handle: "@elias4044",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:hello@elias4044.com",
    description: "Drop me a line",
    handle: "hello@elias4044.com",
  },
  {
    name: "Website",
    icon: Globe,
    href: "https://elias4044.com",
    description: "You are here",
    handle: "elias4044.com",
  },
]

export function ConnectSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 })

  return (
    <section id="connect" className="relative px-6 py-32" ref={ref}>
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <div
            className={`transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="font-mono text-sm text-primary">{"// 03"}</span>
            <h2 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">
              {"Let's Connect"}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {"If you'd like to discuss a project or just say hi, I'm always down to chat."}
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {socials.map((social, i) => {
            const Icon = social.icon
            return (
              <a
                key={social.name}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`group relative flex items-center gap-4 rounded-2xl border border-border/30 bg-card/40 p-5 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:bg-card/60 hover:shadow-[0_0_30px_rgba(100,210,220,0.08)] ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: isInView ? `${200 + i * 100}ms` : "0ms" }}
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-secondary/50 transition-all duration-300 group-hover:bg-primary/20 group-hover:shadow-[0_0_15px_rgba(100,210,220,0.2)]">
                  <Icon className="h-5 w-5 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                    {social.name}
                  </div>
                  <div className="truncate font-mono text-xs text-muted-foreground">
                    {social.handle}
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
