"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const skills = [
  { name: "TypeScript", level: 90 },
  { name: "React / Next.js", level: 92 },
  { name: "Node.js", level: 95 },
  { name: "Python", level: 75 },
  { name: "Tailwind CSS", level: 78 },
  { name: "Firebase", level: 90 },
  { name: "Cybersecurity", level: 85 },
  { name: "Git / DevOps", level: 90 },
]

const interests = [
  "Web Development",
  "Open Source",
  "Cyber Security",
  "UI/UX Design",
  "Creative Coding",
  "Automation",
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from(".about-label", {
        scrollTrigger: { trigger: ".about-label", start: "top 88%" },
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: "power2.out",
      })

      gsap.from(".about-heading", {
        scrollTrigger: { trigger: ".about-heading", start: "top 85%" },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
      })

      gsap.from(".about-statement", {
        scrollTrigger: { trigger: ".about-statement", start: "top 85%" },
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power2.out",
      })

      gsap.from(".about-para", {
        scrollTrigger: { trigger: ".about-para", start: "top 80%" },
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
      })

      gsap.from(".skill-bar-inner", {
        scrollTrigger: { trigger: ".skills-grid", start: "top 78%" },
        scaleX: 0,
        duration: 1.2,
        stagger: 0.07,
        ease: "power3.out",
        transformOrigin: "left",
      })

      gsap.from(".interest-tag", {
        scrollTrigger: { trigger: ".interests-grid", start: "top 85%" },
        opacity: 0,
        y: 12,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
      })
    },
    { scope: sectionRef }
  )

  return (
    <section id="about" ref={sectionRef} className="px-6 lg:px-16 py-32 lg:py-48">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-20 lg:mb-28">
          <span className="about-label block font-mono text-xs text-muted-foreground tracking-widest uppercase mb-4">
            01 — About
          </span>
          <h2
            className="about-heading font-black tracking-tighter text-foreground leading-none"
            style={{ fontSize: "clamp(56px, 11vw, 160px)", lineHeight: 0.9, letterSpacing: "-0.04em" }}
          >
            About<br />Me
          </h2>
        </div>

        {/* Big statement */}
        <p className="about-statement text-2xl md:text-3xl lg:text-4xl font-medium text-foreground leading-tight max-w-4xl mb-20 lg:mb-28">
          {
            "A developer who builds because I can't not build — turning curiosity into systems that work beautifully and hold up under pressure."
          }
        </p>

        {/* Two-column content */}
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Bio */}
          <div className="space-y-6">
            {[
              "I'm Elias — based in Sweden. I started with curiosity, broke a lot of things, fixed them, and kept going. Over time that turned into a real love for full-stack development.",
              "I care about systems that make sense. Clean architecture, smooth UX, thoughtful design — not just things that work, but things that feel right. I enjoy working across the stack, from crafting responsive interfaces to designing backend logic and APIs.",
              "Right now I'm focused on leveling up — building real projects, exploring automation and cybersecurity, and learning how to ship ideas properly. Long term, I want to create tools people can truly own. The goal isn't just to code — it's to build things that matter.",
            ].map((text, i) => (
              <p
                key={i}
                className="about-para text-lg leading-relaxed text-muted-foreground"
              >
                {text}
              </p>
            ))}

            {/* Interests */}
            <div className="pt-6 interests-grid">
              <span className="block font-mono text-xs text-muted-foreground/60 tracking-widest uppercase mb-4">
                Areas of Interest
              </span>
              <div className="flex flex-wrap gap-2">
                {interests.map((item) => (
                  <span
                    key={item}
                    className="interest-tag rounded-full border border-border/30 px-4 py-1.5 font-mono text-xs text-muted-foreground/80 hover:border-border/60 hover:text-foreground transition-colors duration-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="skills-grid">
            <span className="block font-mono text-xs text-muted-foreground/60 tracking-widest uppercase mb-8">
              Stack &amp; Skills
            </span>
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-baseline mb-3">
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    <span className="font-mono text-xs text-muted-foreground/60">{skill.level}%</span>
                  </div>
                  <div className="h-px bg-border/20">
                    <div
                      className="skill-bar-inner h-px bg-foreground/60"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
