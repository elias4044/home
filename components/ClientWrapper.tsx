// components/ClientWrapper.tsx
"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Nav } from "./Nav";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDocs = pathname?.startsWith("/docs");

  return (
    <>
      {!isDocs && (
        <>
          <Nav />
        </>
      )}

      
      <main>{children}</main>
    </>
  );
}
