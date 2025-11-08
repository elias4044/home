"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { db } from "@/lib/firebaseClient"; 
import { collection, onSnapshot, query } from "firebase/firestore";

type SiteStatus = {
  title: string;
  url: string;
  description?: string;
  status: "online" | "degraded" | "offline";
};

export default function Status() {
  const [sites, setSites] = useState<SiteStatus[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    const q = query(collection(db, "sites"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: SiteStatus[] = snapshot.docs.map((doc) => doc.data() as SiteStatus);
      setSites(data);
      setLastUpdated(new Date().toLocaleString());
    });

    return () => unsubscribe();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "text-green-500";
      case "degraded":
        return "text-yellow-500";
      case "offline":
        return "text-red-500";
      default:
        return "text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "degraded":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "offline":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center pt-20 px-6">
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-fg mb-6"
      >
        System Status
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-sm text-muted-foreground mb-10"
      >
        Last updated: {lastUpdated}
      </motion.p>

      <div className="grid gap-4 w-full max-w-2xl">
        {sites.map((site, i) => (
          <motion.div
            key={site.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex justify-between items-center rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              {getStatusIcon(site.status)}
              <a
                href={`https://${site.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-fg hover:underline"
              >
                {site.title}
              </a>
            </div>
            <span
              className={`capitalize font-medium ${getStatusColor(site.status)}`}
            >
              {site.status}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center text-muted-foreground text-sm"
      >
        All systems are being monitored continuously.
      </motion.div>
    </div>
  );
}
