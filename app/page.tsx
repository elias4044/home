"use client"
import { useState, useEffect, useRef } from "react";
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
  Gamepad2,
  Globe,
  Wrench,
  Sparkles,
  TrendingUp,
  Clock,
  Star,
  Filter,
} from "lucide-react";
import { getGithubData } from "@/lib/getGithubData";

const projects = [
  {
    title: "Schoolsoft+",
    desc: "Enhanced Schoolsoft with modern UI and features",
    icon: BookOpen,
    href: "https://ssp.elias4044.com",
    status: "Preview",
    category: "Web",
    tech: ["HTML", "CSS", "JavaScript", "Vercel"],
    stars: 0,
    featured: true,
  },
  {
    title: "Status Dashboard",
    desc: "Real-time service monitoring with uptime tracking",
    icon: Activity,
    href: "/status",
    status: "Active",
    category: "Web",
    tech: ["React", "Node.js"],
    stars: 0,
    featured: false,
  },
  {
    title: "Portfolio",
    desc: "Personal portfolio showcasing projects and skills",
    icon: User,
    href: "https://portfolio.elias4044.com",
    status: "Live",
    category: "Web",
    tech: ["Next.js", "Tailwind"],
    stars: 1,
    featured: true,
  },
  {
    title: "Documentation",
    desc: "Comprehensive documenation over all of my apps and projects.",
    icon: Code2,
    href: "/docs",
    status: "Active",
    category: "Documentation",
    tech: ["shadcn/ui", "Next.js"],
    stars: null,
    featured: false,
  },
  {
    title: "Launch Menu",
    desc: "A one-click tool to spin up your apps and servers.",
    icon: Gamepad2,
    href: "https://github.com/elias4044/LaunchMenu",
    status: "Complete",
    category: "Game",
    tech: ["Node.js", "HTML"],
    stars: 0,
    featured: true,
  },
  {
    title: "Elias4044 API",
    desc: "Fast API with documentation coming soon!",
    icon: Globe,
    href: "/docs",
    status: "Active",
    category: "API",
    tech: ["NodeJS", "Next.js"],
    stars: null,
    featured: false,
  },
];

const quickLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/elias4044" },
  { name: "Email", icon: Mail, href: "mailto:elias4044@pm.me" },
];

const skills = [
  { name: "Next.js", level: 85, color: "bg-blue-500" },
  { name: "React", level: 90, color: "bg-cyan-500" },
  { name: "TypeScript", level: 80, color: "bg-blue-600" },
  { name: "Node.js", level: 85, color: "bg-green-600" },
  { name: "Python", level: 75, color: "bg-yellow-500" },
  { name: "Lua/Roblox", level: 70, color: "bg-red-500" },
  { name: "Godot", level: 20, color: "bg-indigo-500" },
];

export default function Hub() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [counts, setCounts] = useState({ projects: 0, stars: 0, uptime: 0 });
  const [githubData, setGithubData] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getGithubData();
      setGithubData(data);
    }
    load();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!githubData) return; // wait for data

    const targetProjects = githubData.totalRepos;
    const targetStars = githubData.totalStars;
    const targetUptime = 99.9;

    let currentProjects = 0;
    let currentStars = 0;
    let currentUptime = 0;

    const interval = setInterval(() => {
      currentProjects = Math.min(currentProjects + 1, targetProjects);
      currentStars = Math.min(currentStars + 5, targetStars);
      currentUptime = Math.min(currentUptime + 2, targetUptime);

      setCounts({
        projects: currentProjects,
        stars: currentStars,
        uptime: currentUptime,
      });

      if (
        currentProjects >= targetProjects &&
        currentStars >= targetStars &&
        currentUptime >= targetUptime
      ) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [githubData]);


  const categories = ["All", "Web", "Game", "API", "Tools", "Documentation"];
  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const parallaxX = (mousePos.x / window.innerWidth - 0.5) * 20;
  const parallaxY = (mousePos.y / window.innerHeight - 0.5) * 20;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-blue-950 text-neutral-900 dark:text-neutral-100 overflow-hidden">
      <div
        className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none transition-transform duration-200 ease-out"
        style={{ transform: `translate(${parallaxX}px, ${parallaxY}px)` }}
      />

      <div className="fixed top-20 left-20 w-72 h-72 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-float" />
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-float-delayed" />

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        <div className="mb-16 text-center animate-fade-in">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 mx-auto rounded-2xl animated-gradient flex items-center justify-center shadow-2xl animate-spin-slow hover:animate-spin-fast transition-all">
              <Orbit className="w-10 h-10 text-primary" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Elias4044 Hub
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Full-stack developer, game creator, and tech enthusiast building the next generation of digital experiences
          </p>

          <div className="flex items-center justify-center gap-3 mt-6">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-blue-400 dark:hover:border-blue-600 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  title={link.name}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Projects", value: counts.projects, icon: Code2 },
            { label: "Total Stars", value: counts.stars, icon: Star },
            { label: "Uptime", value: `${counts.uptime.toFixed(1)}%`, icon: TrendingUp },
            { label: "Years Active", value: new Date().getFullYear() - 2024 + 1, icon: Clock },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="relative p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:scale-105 hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <Icon className="w-5 h-5 mb-2 text-blue-600 dark:text-blue-400" />
                  <div className="text-3xl font-bold tracking-tight mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-neutral-500 dark:text-neutral-400 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap hover:scale-105 ${selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-blue-400 dark:hover:border-blue-600"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {selectedCategory === "All" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projects.filter(p => p.featured).map((project, idx) => {
                const Icon = project.icon;
                return (
                  <a
                    key={project.title}
                    href={project.href}
                    target={project.href.startsWith("http") ? "_blank" : "_self"}
                    rel={project.href.startsWith("http") ? "noopener noreferrer" : ""}
                    className="group relative p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-white via-white to-blue-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-blue-950 hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105 hover:-translate-y-2 animate-slide-up"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                        {project.desc}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tech.map(tech => (
                          <span key={tech} className="text-xs px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1 text-neutral-500">
                          <Star className="w-3 h-3" /> {project.stars}
                        </span>
                        <span className="px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-blue-500" />
            {selectedCategory === "All" ? "All Projects" : `${selectedCategory} Projects`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProjects.map((project, idx) => {
              const Icon = project.icon;
              const isExternal = project.href.startsWith("http");

              return (
                <a
                  key={project.title}
                  href={project.href}
                  target={isExternal ? "_blank" : "_self"}
                  rel={isExternal ? "noopener noreferrer" : ""}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group relative p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-slide-up"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 group-hover:from-blue-500 group-hover:to-purple-600 transition-all duration-300">
                        <Icon className="w-5 h-5 text-neutral-700 dark:text-neutral-300 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-base">
                          {project.title}
                        </h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          {project.category}
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                    {project.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, 2).map(tech => (
                        <span key={tech} className="text-xs px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      {project.stars > -1 && (
                        <span className="flex items-center gap-1 text-neutral-500">
                          <Star className="w-3 h-3" /> {project.stars}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                        {project.status}
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Tech Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skill, idx) => (
              <div
                key={skill.name}
                className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm animate-slide-up"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{skill.name}</span>
                  <span className="text-xs text-neutral-500">{skill.level}%</span>
                </div>
                <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${skill.color} rounded-full animate-skill-bar`}
                    style={{
                      width: `${skill.level}%`,
                      animationDelay: `${idx * 50}ms`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className="text-center text-sm text-neutral-500 dark:text-neutral-400 pt-12 border-t border-neutral-200 dark:border-neutral-800">
          <p className="mb-2">Built with Next.js, React, and Framer Motion</p>
          <p>&copy; Elias4044 · {new Date().getFullYear()}</p>
        </footer>
      </div>

      <style jsx>{`
        .animated-gradient {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4);
          background-size: 300% 300%;
          animation: gradientShift 8s ease infinite;
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(100px, -50px); }
        }

        @keyframes floatDelayed {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-100px, 50px); }
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: floatDelayed 25s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slideUp 0.6s ease-out backwards;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }

        .animate-spin-fast {
          animation: spin 0.8s ease-out;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientFlow 3s ease infinite;
        }

        @keyframes gradientFlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-skill-bar {
          animation: skillBarGrow 1s ease-out;
        }

        @keyframes skillBarGrow {
          from { width: 0; }
        }
      `}</style>
    </div>
  );
}