"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, XCircle, Loader2 } from "lucide-react";

interface Site {
  id: string;
  title: string;
  status: "online" | "degraded" | "offline";
  description: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [sites, setSites] = useState<Site[]>([]);
  const [updates, setUpdates] = useState<Site[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fetchSites = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/status");
      const data = await res.json();
      if (data.success) {
        setSites(data.sites);
        setUpdates(data.sites);
      } else {
        setError(data.error || "Failed to fetch sites.");
      }
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (authenticated) fetchSites();
  }, [authenticated]);

  const handleAuth = () => {
    if (!password.trim()) return setError("Password cannot be empty.");
    setError(null);
    setAuthenticated(true);
  };

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const res = await fetch("/api/admin/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, updates }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg("Sites updated successfully!");
        fetchSites(); // refresh after update
      } else {
        setError(data.error || "Failed to update sites.");
      }
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  const getStatusIcon = (status: Site["status"]) => {
    switch (status) {
      case "online":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "degraded":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "offline":
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: Site["status"]) => {
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

  if (!authenticated) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center gap-4 p-4">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="password"
          placeholder="Enter admin password"
          className="border p-2 rounded w-64 text-center"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAuth()}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded w-64 hover:bg-blue-600 transition"
          onClick={handleAuth}
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5 mx-auto" /> : "Login"}
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>

      {loading && (
        <div className="flex items-center gap-2 mb-4 text-gray-500">
          <Loader2 className="animate-spin w-5 h-5" />
          <span>Loading...</span>
        </div>
      )}

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMsg && <p className="text-green-500 mb-4">{successMsg}</p>}

      <div className="space-y-4">
        {updates.map((site, i) => (
          <motion.div
            key={site.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row gap-2 items-center p-4 border rounded-lg hover:shadow-md transition bg-gray-50 dark:bg-gray-900"
          >
            <input
              value={site.title}
              onChange={(e) => {
                const newUpdates = [...updates];
                newUpdates[i].title = e.target.value;
                setUpdates(newUpdates);
              }}
              className="border p-2 rounded flex-1"
              placeholder="Title"
            />
            <select
              value={site.status}
              onChange={(e) => {
                const newUpdates = [...updates];
                newUpdates[i].status = e.target.value as Site["status"];
                setUpdates(newUpdates);
              }}
              className={`border p-2 rounded w-40 ${getStatusColor(site.status)}`}
            >
              <option value="online">Online</option>
              <option value="degraded">Degraded</option>
              <option value="offline">Offline</option>
            </select>
            <input
              value={site.description}
              onChange={(e) => {
                const newUpdates = [...updates];
                newUpdates[i].description = e.target.value;
                setUpdates(newUpdates);
              }}
              className="border p-2 rounded flex-1"
              placeholder="Description"
            />
          </motion.div>
        ))}
      </div>

      <button
        onClick={handleUpdate}
        disabled={loading}
        className="bg-green-500 text-white p-3 rounded mt-6 w-full hover:bg-green-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? <Loader2 className="animate-spin w-5 h-5 mx-auto" /> : "Save Changes"}
      </button>
    </div>
  );
}
