// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Nav } from "../components/Nav";
import { ThemeProvider } from "@/components/theme-provider";
import ClientWrapper from "@/components/ClientWrapper";

export const metadata: Metadata = {
  title: "Elias4044",
  description: "Docs, statuses and more for all of Elias's projects.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClientWrapper>{children}</ClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
