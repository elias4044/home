import React from "react";

import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata = {
  title: "Docs - Elias4044",
};



export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background text-foreground">
        <main className="flex flex-row min-h-screen">{children}</main>
      </div>
    </SidebarProvider>
  );
}