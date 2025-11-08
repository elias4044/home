"use client";
import React from "react";

export function DocsSection({ title, subtitle, children }: { title?: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      {title && <div className="mb-4"><h2 className="text-2xl font-semibold">{title}</h2>{subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}</div>}
      <div>{children}</div>
    </section>
  );
}