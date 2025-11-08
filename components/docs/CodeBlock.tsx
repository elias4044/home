"use client";
import React from "react";

export default function CodeBlock({ code, small = false }: { code: string; small?: boolean }) {
  return (
    <pre className={`rounded-lg p-3 font-mono overflow-x-auto bg-[#0b0b0b] border border-muted-foreground/8 ${small ? 'text-sm' : 'text-xs'}`}>
      <code>{code}</code>
    </pre>
  );
}