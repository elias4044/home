"use client";
import React from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import CommandPalette from "@/components/docs/CommandPalette";
import { useTheme } from "next-themes";

export default function DocsHeader() {
    const { theme, setTheme } = useTheme();

  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4h16v16H4z" fill="white" fillOpacity="0.06" />
            </svg>
          </div>
          <div className="hidden sm:block">
            <div className="text-lg font-semibold">Elias Docs</div>
            <div className="text-xs text-muted-foreground">v1.0</div>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <CommandPalette />
        <button className="rounded-md px-3 py-2 bg-muted/40 border border-muted-foreground/10" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>Toggle theme</button>
      </div>
    </header>
  );
}