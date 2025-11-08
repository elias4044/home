import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"


export const metadata: Metadata = {
    title: "Elias4044 Status",
    description: "Status for all of Elias's projects.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return children;
}
