"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sun, Moon, Home } from "lucide-react"
import { useTheme } from "next-themes";

export function Nav() {

  const { theme, setTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 w-full z-40 flex items-center justify-between px-6 py-4">
      <Link href="/" className="text-fg tracking-wide uppercase text-sm"><Home size={24} /></Link>
      <div className="flex gap-4">
        <motion.button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 rounded-full border border-[rgb(var(--text))]/20 bg-[rgb(var(--text))]/10 px-6 py-3 font-medium text-[rgb(var(--text))] transition hover:bg-[rgb(var(--text))]/20"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          <div className="hidden sm:block">Theme</div>
        </motion.button>
      </div>
    </nav>
  );
}