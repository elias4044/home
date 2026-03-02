"use client"

import { useInView } from "@/hooks/use-in-view"

const skills = [
  "JavaScript", "TypeScript", "React", "Next.js",
  "Node.js", "Python", "Tailwind CSS", "Git",
]

export function AboutSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 })

  return (
    <section id="about" className="relative px-6 py-32" ref={ref}>
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-16 flex items-center gap-4">
          <div
            className={`transition-all duration-700 ${isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
          >
            <span className="font-mono text-sm text-primary">{"// 01"}</span>
            <h2 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">
              About Me
            </h2>
          </div>
          <div
            className={`hidden h-px flex-1 bg-border/30 md:block transition-all duration-1000 delay-300 ${isInView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
            style={{ transformOrigin: "left" }}
          />
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-200 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                {"I'm Elias — a developer who builds because I genuinely can't not build. I started with curiosity, broke a lot of things, fixed them, and kept going. Over time that turned into a real love for full-stack development and creating products people can actually use."}
              </p>

              <p>
                {"I care about systems that make sense. Clean architecture, smooth UX, thoughtful design — not just things that work, but things that feel right. I enjoy working across the stack, from crafting responsive interfaces in React and Next.js to designing backend logic and APIs."}
              </p>

              <p>
                {"Right now I'm focused on leveling up — building real projects, exploring automation, cybersecurity and learning how to ship ideas properly. Long term, I want to create tools people can host themselves and truly own. The goal isn't just to code — it's to build things that matter."}
              </p>
            </div>
          </div>

          <div
            className={`lg:col-span-2 transition-all duration-700 delay-400 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div className="rounded-2xl border border-border/30 bg-card/50 p-6 backdrop-blur-sm glow-border">
              <h3 className="mb-4 font-mono text-sm font-medium text-primary">
                {"< Technologies />"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span
                    key={skill}
                    className={`rounded-lg border border-border/30 bg-secondary/30 px-3 py-1.5 font-mono text-xs text-foreground/80 transition-all duration-500 hover:border-primary/40 hover:bg-primary/10 hover:text-primary ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                    style={{ transitionDelay: isInView ? `${500 + i * 80}ms` : "0ms" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-6 border-t border-border/20 pt-6">
                <h3 className="mb-3 font-mono text-sm font-medium text-primary">
                  {"// Interests"}
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {["Web Development", "Open Source", "Cyber Security", "UI/UX Design", "Creative Coding"].map((interest) => (
                    <div key={interest} className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-primary" />
                      <span>{interest}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
