"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Minimal command-like search — replace with shadcn command/cmdk for advanced
export default function CommandPalette() {
  const [q, setQ] = useState("");
  return (
    <div className="relative">
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search docs..."
        className="w-[340px] hidden md:block"
        aria-label="Search documentation"
      />
      <div className="md:hidden p-2 rounded-md bg-muted/30">
        <Search className="w-4 h-4 text-muted-foreground" />
      </div>
    </div>
  );
}