"use client";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import {
  BookOpen,
  Code2,
  Activity,
  User,
  Github,
  Mail,
  Zap,
  ExternalLink,
  Orbit,
} from "lucide-react";

const projects = [
  {
    title: "Schoolsoft+",
    desc: "Enhanced Schoolsoft experience",
    icon: BookOpen,
    href: "https://schoolsoftplus.vercel.app",
    status: "Live",
  },
  {
    title: "Status Dashboard",
    desc: "Real-time service monitoring",
    icon: Activity,
    href: "/status",
    status: "Active",
  },
  {
    title: "Portfolio",
    desc: "Learn more about me",
    icon: User,
    href: "https://elias4044.vercel.app",
    status: "Live",
  },
  {
    title: "Documentation",
    desc: "API docs and guides",
    icon: Code2,
    href: "/docs",
    status: "Active",
  },
];

const quickLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/elias4044" },
  { name: "Email", icon: Mail, href: "mailto:elias4044@proton.me" },
];

export default function Hub() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Track mouse for parallax & magnetic effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const translateX = useTransform(mouseX, [-0.5, 0.5], ["-10px", "10px"]);
  const translateY = useTransform(mouseY, [-0.5, 0.5], ["-10px", "10px"]);

  // Stat counter animation
  const useCounter = (end: number, duration = 1000) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      let start = 0;
      const step = Math.ceil(end / (duration / 16));
      const interval = setInterval(() => {
        start += step;
        if (start >= end) {
          start = end;
          clearInterval(interval);
        }
        setCount(start);
      }, 16);
      return () => clearInterval(interval);
    }, [end, duration]);
    return count;
  };

  const activeProjects = useCounter(4);
  const uptime = useCounter(100);

  const [welcomePhase, setWelcomePhase] = useState<"hidden" | "visible" | "fadingOut">("hidden");

  useEffect(() => {
    const hasVisited = localStorage.getItem("visited");
    if (!hasVisited) {
      setWelcomePhase("visible");
      localStorage.setItem("visited", "true");

      // Start fade out after 2s
      setTimeout(() => setWelcomePhase("fadingOut"), 2000);
      // Fully remove after 3s
      setTimeout(() => setWelcomePhase("hidden"), 3000);
    }
  }, []);



  return (
    <div className="relative min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 overflow-hidden">
      {welcomePhase !== "hidden" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: welcomePhase === "visible" ? 1 : 0,
            scale: welcomePhase === "visible" ? 1 : 1.05,
            y: welcomePhase === "visible" ? 0 : -20,
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-lg"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: welcomePhase === "visible" ? 1 : 0,
              scale: welcomePhase === "visible" ? 1 : 0.95,
              y: welcomePhase === "visible" ? 0 : -10,
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-4xl font-semibold text-white tracking-tight"
          >
            Welcome to{" "}
            <motion.span
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              elias4044.com
            </motion.span>
          </motion.h1>
        </motion.div>
      )}


      {/* Parallax grid */}
      <motion.div
        className="fixed inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"
        style={{ x: translateX, y: translateY }}
      />

      <div className="relative max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-10 h-10 rounded-full animated-gradient flex items-center justify-center text-primary font-bold shadow-lg"
            >
              <Orbit className="w-6 h-6" />
            </motion.div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">Elias4044</h1>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Central access point
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-300"
                  title={link.name}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Projects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 flex items-center gap-2 tracking-tight">
              <Zap className="w-4 h-4" />
              MY PROJECTS
            </h2>
            <span className="text-xs text-neutral-400 dark:text-neutral-500">
              {projects.length} active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {projects.map((project, idx) => {
              const Icon = project.icon;
              const isExternal = project.href.startsWith("http");

              return (
                <motion.a
                  key={project.title}
                  href={project.href}
                  target={isExternal ? "_blank" : "_self"}
                  rel={isExternal ? "noopener noreferrer" : ""}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.08 }}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  whileHover={{
                    scale: 1.005,
                    rotate: 0.15,
                    transition: { duration: 0.2, ease: "easeOut" },
                  }}

                  className="group relative p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-purple-600 transition-all duration-300">
                          <Icon className="w-4 h-4 text-neutral-700 dark:text-neutral-300 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm tracking-tight text-neutral-900 dark:text-neutral-100">
                            {project.title}
                          </h3>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            {project.desc}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                          {project.status}
                        </span>
                        <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
        >
          {[
            { label: "Active Projects", value: activeProjects },
            { label: "Uptime", value: `${uptime}%` },
            { label: "Primary Stack", value: "Next.js" },
            { label: "Building Since", value: "2024" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
            >
              <div className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                {stat.value}
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-neutral-400 dark:text-neutral-500 pt-8 border-t border-neutral-200 dark:border-neutral-800"
        >
          &copy; Elias4044 · {new Date().getFullYear()}
        </motion.footer>
      </div>

      {/* Animated gradient utility */}
      <style jsx>{`
        .animated-gradient {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4);
          background-size: 300% 300%;
          animation: gradientShift 6s ease infinite;
        }
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
