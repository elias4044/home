"use client";
import React, { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check, Play } from "lucide-react";
import CodeBlock from "@/components/docs/CodeBlock";

export default function EndpointCard({ endpoint, initialOpen = false }: { endpoint: any; initialOpen?: boolean }) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(initialOpen);
  const [testParams, setTestParams] = useState<any>({});
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const copyPath = async () => {
    await navigator.clipboard.writeText(endpoint.path);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const tryIt = async () => {
    setLoading(true);
    try {
      const query = Object.entries(testParams).filter(([_, v]) => v).map(([k, v]) => `${k}=${encodeURIComponent(v as any)}`).join("&");
      const url = `${endpoint.path}${query ? `?${query}` : ""}`;
      const res = await fetch(url);
      const json = await res.json();
      setResponse(JSON.stringify(json, null, 2));
    } catch (err: any) {
      setResponse(`Error: ${err.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="bg-muted/30 rounded-lg border border-muted-foreground/10 overflow-hidden">
      <button
        className="w-full text-left px-4 py-3 flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <Badge variant="secondary">{endpoint.method}</Badge>
          <code className="font-mono text-sm">{endpoint.path}</code>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); copyPath(); }}>
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </Button>
          <svg className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 24 24"><path fill="currentColor" d="M7 10l5 5 5-5z"/></svg>
        </div>
      </button>

      {open && (
        <div className="px-4 pb-4 pt-2 space-y-4">
          <p className="text-sm text-muted-foreground">{endpoint.desc}</p>

          {endpoint.params?.length > 0 && (
            <div className="space-y-2">
              {endpoint.params.map((p: any) => (
                <div key={p.name} className="p-2 bg-background/60 rounded border border-muted-foreground/6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3"><code className="font-mono text-sm">{p.name}</code><span className="text-xs text-muted-foreground">{p.type}</span></div>
                    {p.required && <span className="text-xs text-red-400">required</span>}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{p.desc}</div>
                </div>
              ))}
            </div>
          )}

          <div>
            <h4 className="text-sm font-medium mb-2">Response</h4>
            <CodeBlock code={endpoint.response} />
          </div>

          <div className="pt-2 border-t border-muted-foreground/8">
            {endpoint.params?.length > 0 && (
              <div className="space-y-2 mb-3">
                {endpoint.params.map((p: any) => (
                  <input key={p.name} placeholder={p.name} className="w-full p-2 rounded bg-background/40 border border-muted-foreground/6" onChange={(e) => setTestParams({ ...testParams, [p.name]: e.target.value })} />
                ))}
              </div>
            )}
            <div className="flex items-center gap-2">
              <Button onClick={tryIt} disabled={loading}>
                <Play className="w-4 h-4" />
                <span className="ml-2">{loading ? "Testing..." : "Try it"}</span>
              </Button>
              <Button variant="outline" onClick={() => setResponse("")}>Clear</Button>
            </div>

            {response && (
              <div className="mt-3">
                <CodeBlock code={response} small />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}