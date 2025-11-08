"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebaseClient";
import { doc, onSnapshot, updateDoc, increment } from "firebase/firestore";
import { motion } from "framer-motion";
import { Fingerprint } from "lucide-react";

export default function Button() {
  const [clicks, setClicks] = useState<number | null>(null);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const ref = doc(db, "stats", "button");
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) setClicks(snap.data().clicks);
    });
    return () => unsub();
  }, []);

  const handleClick = async () => {
    const ref = doc(db, "stats", "button");
    setClicked(true);
    await updateDoc(ref, { clicks: increment(1) });
    setTimeout(() => setClicked(false), 150);
  };

  return (
    <div className="flex flex-row">
      <motion.button
        onClick={handleClick}
        whileTap={{ scale: 0.9 }}
        className={`flex items-center gap-2 rounded-full border border-[rgb(var(--accent))]/30 bg-[rgb(var(--accent))]/10 md:px-4 sm:px-3 md:py-2 px-2 py-1 font-semibold text-[rgb(var(--accent))] transition hover:bg-[rgb(var(--accent))]/20`}
      >
        <Fingerprint className={`w-5 h-5 text-xs md:text-base  ${clicked ? "text-green-400" : ""}`} />
        <div className={"sm:text-base text-sm"}>
            Smash Me!
        </div>
      </motion.button>

      <motion.p
        key={clicks ?? "loading"}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="md:ml-6 ml-3 text-3xl font-extrabold text-[rgb(var(--accent))] tracking-tight"
      >
        {clicks !== null ? (
          <span>{clicks.toLocaleString()} <span className="text-sm hidden md:block font-normal text-[rgb(var(--text))]/70">clicks and counting</span></span>
        ) : (
          <span className="text-gray-400">Loading...</span>
        )}
      </motion.p>
    </div>
  );
}
