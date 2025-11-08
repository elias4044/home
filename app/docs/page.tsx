"use client"
import { DocsSection } from "@/components/docs/DocSection";
import EndpointCard from "@/components/docs/EndpointCard";
import DocsSidebar from "@/components/docs/Sidebar";
import { SidebarInset } from "@/components/ui/sidebar";

import { apiEndpoints } from "@/components/docs/sampleData"; // Import data

import { BookOpen, Code2, FileCode, LifeBuoy } from "lucide-react";
import Link from "next/link";


const sections = [
  { title: "Overview", icon: BookOpen, href: "/docs" },
  { title: "API Reference", icon: FileCode, href: "/docs/api" },
  { title: "Guides", icon: Code2, href: "/docs/guides" },
  { title: "Support", icon: LifeBuoy, href: "/support" },
];


export default function DocsIndexPage() {
  return (
    <>
      <DocsSidebar sections={sections} />

      <SidebarInset className={"ml-6 mt-6"}>
        <div className="mb-6">
          <h1 className="text-4xl font-bold">Documentation</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
              Here you will be able to find all of the documentation for all my apps. Currently, the docs are in development.
              Please be patient. Documentation is coming soon and will be released progressively. Check back soon!
              The sidebar currently has placeholder data, and the links are invalid. Press <Link href="/" className="underline">here</Link> to go back.
          </p>
        </div>

        {/* Components for API Reference */}
        {/* <DocsSection title="API Reference" subtitle="Endpoints and examples">
          <div className="grid gap-4">
            {apiEndpoints.map((section) => (
              <div key={section.category}>
                <h3 className="text-2xl font-semibold mb-3">{section.category}</h3>
                <div className="space-y-3">
                  {section.endpoints.map((ep, i) => (
                    <EndpointCard key={ep.path} endpoint={ep} initialOpen={i === 0} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DocsSection> */}

        {/* Another component to use in the docs. Its a little card. */}
        {/* <DocsSection title="Guides" subtitle="How-tos and walkthroughs">
          <div className="space-y-4">
            <article className="p-6 bg-muted/60 rounded-lg">
              <h4 className="text-lg font-medium">Getting Started</h4>
              <p className="text-sm text-muted-foreground mt-2">
                This docs layout supports both prose content and interactive
                examples. Copy the DocsSection component for guide pages.
              </p>
            </article>
          </div>
        </DocsSection> */}
      </SidebarInset>
    </>
  );
}