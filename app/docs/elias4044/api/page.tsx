"use client";

import React, { useState } from "react";
import DocsSidebar from "@/components/docs/Sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { 
  BookOpen, 
  Code2, 
  FileCode, 
  LifeBuoy, 
  Play, 
  Copy, 
  Check, 
  ChevronRight,
  Loader2,
  Terminal
} from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming standard shadcn utils exist
import Link from "next/link";

// --- Types ---
type Param = {
  name: string;
  type: string;
  required: boolean;
  description: string;
  default?: string;
};

type Endpoint = {
  id: string;
  title: string;
  method: "GET" | "POST";
  path: string;
  description: string;
  category: "General" | "Weather" | "Color";
  params?: Param[];
  exampleResponse: object;
};

// --- Data: API Configuration ---
const API_BASE_URL = "https://elias4044.com/api";

const endpoints: Endpoint[] = [
  {
    id: "status",
    title: "System Status",
    category: "General",
    method: "GET",
    path: "/v1/status",
    description: "Returns overall API and site status information used to monitor system health.",
    exampleResponse: {
      success: true,
      sites: [{ title: "elias4044.com", status: "online" }],
      timestamp: "2025-11-21T19:56:48.528Z",
    },
  },
  {
    id: "weather-current",
    title: "Current Weather",   
    category: "Weather",
    method: "GET",
    path: "/v1/tools/weather/current",
    description: "Get current weather for a specific location using city name or coordinates.",
    params: [
      { name: "city", type: "string", required: false, description: "City name (e.g. Halmstad)" },
      { name: "lat", type: "number", required: false, description: "Latitude" },
      { name: "lon", type: "number", required: false, description: "Longitude" },
      { name: "units", type: "string", required: false, description: "'metric' or 'imperial'", default: "metric" },
    ],
    exampleResponse: {
      coord: { lon: 12.8568, lat: 56.6745 },
      weather: [{ main: "Clouds", description: "scattered clouds" }],
      main: { temp: -5.89, humidity: 86 },
      name: "Halmstad",
    },
  },
  {
    id: "weather-forecast",
    title: "Weather Forecast",
    category: "Weather",
    method: "GET",
    path: "/v1/tools/weather/forecast",
    description: "Get multi-day weather forecast for a location.",
    params: [
      { name: "city", type: "string", required: true, description: "City name" },
      { name: "days", type: "number", required: false, description: "Number of days (1-5)", default: "3" },
    ],
    exampleResponse: {
      location: { name: "Halmstad" },
      forecast: [{ date: "2025-11-22", temp: { min: -6, max: 1 } }],
    },
  },
  {
    id: "color-info",
    title: "Color Info",
    category: "Color",
    method: "GET",
    path: "/v1/tools/color/info",
    description: "Get metadata (HEX, RGB, HSL, Name) for a specific color.",
    params: [
      { name: "color", type: "string", required: true, description: "Hex code or name", default: "#ff8800" },
    ],
    exampleResponse: {
      hex: "#FF8800",
      rgb: { r: 255, g: 136, b: 0 },
      name: "Orange",
    },
  },
  {
    id: "color-contrast",
    title: "Color Contrast",
    category: "Color",
    method: "GET",
    path: "/v1/tools/color/contrast",
    description: "Check accessibility contrast ratio between two colors.",
    params: [
      { name: "foreground", type: "string", required: true, description: "Text color", default: "#ffffff" },
      { name: "background", type: "string", required: true, description: "Background color", default: "#000000" },
    ],
    exampleResponse: {
      contrast: 21,
      wcag: { aa: true, aaa: true },
    },
  },
  {
    id: "color-random",
    title: "Random Color",
    category: "Color",
    method: "GET",
    path: "/v1/tools/color/random",
    description: "Generate random colors.",
    params: [
      { name: "count", type: "number", required: false, description: "Number of colors", default: "1" },
    ],
    exampleResponse: {
      colors: ["#A1C3D1"],
    },
  },
];

const sections = [
  { title: "Overview", icon: BookOpen, href: "/docs" },
  { title: "API Reference", icon: FileCode, href: "/docs/api" },
  { title: "Guides", icon: Code2, href: "/docs/guides" },
  { title: "Support", icon: LifeBuoy, href: "/support" },
];

// --- Components ---

/**
 * A reusable badge for HTTP Methods
 */
const MethodBadge = ({ method }: { method: string }) => {
  const colors = {
    GET: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    POST: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
  };
  return (
    <span className={cn("px-2.5 py-0.5 rounded text-xs font-bold border", colors[method as keyof typeof colors] || colors.GET)}>
      {method}
    </span>
  );
};

/**
 * Code Block with Copy Button
 */
const CodeBlock = ({ code, language = "json" }: { code: string; language?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg border bg-slate-950 dark:bg-slate-950 text-slate-50 overflow-hidden">
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
      <pre className="p-4 text-xs sm:text-sm font-mono overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
};

/**
 * Interactive Endpoint Card
 */
const EndpointViewer = ({ endpoint }: { endpoint: Endpoint }) => {
  const [activeTab, setActiveTab] = useState<"docs" | "try">("docs");
  const [params, setParams] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [status, setStatus] = useState<number | null>(null);

  // Initialize default params
  React.useEffect(() => {
    if (endpoint.params) {
      const defaults: Record<string, string> = {};
      endpoint.params.forEach((p) => {
        if (p.default) defaults[p.name] = p.default;
      });
      setParams(defaults);
    }
  }, [endpoint]);

  const handleExecute = async () => {
    setLoading(true);
    setResponse(null);
    setStatus(null);

    try {
      const url = new URL(API_BASE_URL + endpoint.path);
      Object.entries(params).forEach(([key, value]) => {
        if (value) url.searchParams.append(key, value);
      });

      const res = await fetch(url.toString());
      setStatus(res.status);
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: "Failed to fetch", details: String(error) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id={endpoint.id} className="group border rounded-xl bg-background shadow-sm overflow-hidden scroll-mt-24">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <MethodBadge method={endpoint.method} />
            <h3 className="font-mono text-sm sm:text-base font-medium text-foreground">
              {endpoint.path}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">{endpoint.description}</p>
        </div>
        
        <div className="flex p-1 bg-muted rounded-lg shrink-0">
          <button
            onClick={() => setActiveTab("docs")}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-md transition-all",
              activeTab === "docs" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Docs
          </button>
          <button
            onClick={() => setActiveTab("try")}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5",
              activeTab === "try" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Play className="w-3 h-3" /> Try it
          </button>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-0">
        {activeTab === "docs" ? (
          <div className="p-4 sm:p-6 space-y-6">
            {endpoint.params && endpoint.params.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-3">Query Parameters</h4>
                <div className="rounded-lg border overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground">
                      <tr>
                        <th className="px-4 py-2 font-medium">Name</th>
                        <th className="px-4 py-2 font-medium">Type</th>
                        <th className="px-4 py-2 font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {endpoint.params.map((param) => (
                        <tr key={param.name} className="bg-background">
                          <td className="px-4 py-2 font-mono text-primary">
                            {param.name}
                            {param.required && <span className="text-red-500 ml-0.5">*</span>}
                          </td>
                          <td className="px-4 py-2 text-muted-foreground">{param.type}</td>
                          <td className="px-4 py-2">
                            {param.description}
                            {param.default && <span className="ml-2 px-1.5 py-0.5 rounded bg-muted text-xs text-muted-foreground">Default: {param.default}</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            <div>
              <h4 className="text-sm font-semibold mb-3">Example Response</h4>
              <CodeBlock code={JSON.stringify(endpoint.exampleResponse, null, 2)} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x h-[500px] lg:h-[400px]">
            {/* Input Section */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-muted/10">
              <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <Terminal className="w-4 h-4" /> Configure Request
              </h4>
              
              <div className="space-y-4">
                {!endpoint.params ? (
                  <p className="text-sm text-muted-foreground italic">No parameters required for this endpoint.</p>
                ) : (
                  endpoint.params.map((param) => (
                    <div key={param.name} className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground flex justify-between">
                        <span>{param.name}</span>
                        {param.required && <span className="text-xs text-red-400">Required</span>}
                      </label>
                      <input
                        type="text"
                        placeholder={param.default || `Enter ${param.name}`}
                        value={params[param.name] || ""}
                        onChange={(e) => setParams({ ...params, [param.name]: e.target.value })}
                        className="w-full px-3 py-2 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                      />
                    </div>
                  ))
                )}
                
                <button
                  onClick={handleExecute}
                  disabled={loading}
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                  Send Request
                </button>
              </div>
            </div>

            {/* Output Section */}
            <div className="flex-1 p-0 flex flex-col bg-slate-950 text-slate-50 overflow-hidden">
              <div className="px-4 py-2 border-b border-slate-800 bg-slate-900 flex justify-between items-center">
                <span className="text-xs font-mono text-slate-400">Response Body</span>
                {status && (
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded font-bold",
                    status >= 200 && status < 300 ? "bg-green-900/50 text-green-400" : "bg-red-900/50 text-red-400"
                  )}>
                    {status}
                  </span>
                )}
              </div>
              <div className="flex-1 overflow-auto p-4">
                {response ? (
                  <pre className="font-mono text-xs sm:text-sm text-blue-300">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-2">
                    <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center">
                      <Play className="w-5 h-5 ml-0.5" />
                    </div>
                    <p className="text-sm">Ready to send request</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Page Component ---

export default function DocsIndexPage() {
  return (
    <>
      <DocsSidebar sections={sections} />

      <SidebarInset className="w-full overflow-x-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          
          {/* Hero Section */}
          <header className="mb-10 sm:mb-16">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-4">
              v1.0.0
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Elias4044 API Reference
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-6">
              Welcome to the developer hub. Explore the tools, status checkers, and utilities available via our REST API.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-3 bg-muted/50 rounded-lg border text-sm font-mono">
              <span className="text-muted-foreground select-none px-2">Base URL:</span>
              <div className="flex items-center gap-2 bg-background px-3 py-1.5 rounded border flex-1 w-full sm:w-auto">
                <code className="text-primary">{API_BASE_URL}</code>
              </div>
            </div>
          </header>

          {/* Table of Contents / Endpoint Links */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4">Available Endpoints</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {endpoints.map(ep => (
                <Link 
                  key={ep.id} 
                  href={`#${ep.id}`}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent hover:text-accent-foreground transition-all group"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className={cn("w-2 h-2 rounded-full shrink-0", 
                      ep.category === 'Weather' ? "bg-blue-500" : 
                      ep.category === 'Color' ? "bg-purple-500" : "bg-green-500"
                    )} />
                    <span className="font-medium truncate">{ep.title}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          </section>

          <hr className="my-10 border-border" />

          {/* API Endpoint Documentation */}
          <div className="space-y-16">
            {/* Grouping by Category just for visual structure */}
            {["General", "Weather", "Color"].map((category) => {
              const categoryEndpoints = endpoints.filter(e => e.category === category);
              if (categoryEndpoints.length === 0) return null;

              return (
                <section key={category} className="space-y-8">
                  <div className="flex items-center gap-2 mb-6">
                    <h2 className="text-2xl font-bold tracking-tight">{category}</h2>
                    <span className="h-px flex-1 bg-border"></span>
                  </div>

                  <div className="space-y-8">
                    {categoryEndpoints.map((endpoint) => (
                      <EndpointViewer key={endpoint.id} endpoint={endpoint} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {/* Footer */}
          <footer className="mt-20 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Elias4044. All rights reserved.</p>
          </footer>

        </div>
      </SidebarInset>
    </>
  );
}