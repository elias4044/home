"use client";
import React from "react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Code2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // shadcn util for conditional classes

export default function DocsSidebar({ sections }: { sections: { title: string; href: string; icon: any }[] }) {
  const pathname = usePathname();

  return (
    <>
      <SidebarTrigger className="md:hidden absolute pr-2 pt-2 z-50 right-5 bottom-5" />
      <Sidebar side={"left"} collapsible="icon" className="border-r border-border bg-background/60 backdrop-blur-md">
        <SidebarHeader className="px-3 py-2 flex justify-content p-2 border-b border-border list-none">
          <SidebarMenuItem>
            <Link href="/docs" className="flex items-center gap-2 pl-[5px] text-lg font-semibold">
              <Code2 className="w-5 h-5 text-primary shrink-0" />
              <span className="truncate group-data-[collapsible=icon]:opacity-0">Docs</span>
            </Link>
          </SidebarMenuItem>

        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Documentation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sections.map((section) => (
                  <SidebarMenuItem key={section.href}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        pathname === section.href
                          ? "bg-accent text-accent-foreground font-medium"
                          : "text-muted-foreground"
                      )}
                    >
                      <Link href={section.href}>
                        <section.icon className="w-4 h-4 shrink-0" />
                        <span>{section.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-2 border-t border-border">
          <SidebarTrigger className="w-full justify-center text-sm font-medium hover:bg-accent hover:text-accent-foreground">
            Toggle
          </SidebarTrigger>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
