"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { motion } from "framer-motion"
import { Github, Twitter, Mail, Globe, ArrowUpRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const socials = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/elias4044",
    handle: "@elias4044",
    description: "Source code & open source",
  },
  {
    name: "X / Twitter",
    icon: Twitter,
    href: "https://x.com/elias4044_",
    handle: "@elias4044_",
    description: "Thoughts & updates",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:hello@elias4044.com",
    handle: "hello@elias4044.com",
    description: "Drop me a line",
  },
  {
    name: "Website",
    icon: Globe,
    href: "https://elias4044.com",
    handle: "elias4044.com",
    description: "You are here",
  },
]

export function ConnectSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from(".connect-label", {
        scrollTrigger: { trigger: ".connect-label", start: "top 88%" },
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: "power2.out",
      })

      gsap.from(".connect-line", {
        scrollTrigger: { trigger: ".connect-heading", start: "top 85%" },
        opacity: 0,
        y: 70,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
      })
    },
    { scope: sectionRef }
  )

  return (
    <section id="connect" ref={sectionRef} className="px-6 lg:px-16 py-32 lg:py-48">
      <div className="mx-auto max-w-7xl">
        {/* Label */}
        <span className="connect-label block font-mono text-xs text-muted-foreground tracking-widest uppercase mb-12">
          03 — Connect
        </span>

        {/* Giant CTA */}
        <div className="connect-heading mb-24 lg:mb-32">
          {["Let's build", "something", "together."].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <span
                className="connect-line block font-black tracking-tighter text-foreground"
                style={{
                  fontSize: "clamp(52px, 11vw, 160px)",
                  lineHeight: 0.92,
                  letterSpacing: "-0.04em",
                  color: i === 1 ? "oklch(0.50 0.005 270)" : undefined,
                }}
              >
                {line}
              </span>
            </div>
          ))}
        </div>

        {/* Social cards */}
        <div className="connect-cards grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {socials.map((social, i) => {
            const Icon = social.icon
            return (
              <motion.a
                key={social.name}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col justify-between p-6 border border-border/20 rounded-2xl hover:border-border/50 hover:bg-secondary/10 transition-colors duration-300 min-h-40"
              >
                <div className="flex items-start justify-between">
                  <Icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground mb-1">{social.name}</div>
                  <div className="font-mono text-xs text-muted-foreground/60">{social.handle}</div>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
