import NextAuthProvider from "@/lib/auth/Provider";
import TrpcProvider from "@/lib/trpc/Provider";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "ChronoSecrets",
    template: "%s | ChronoSecrets",
  },
  description: "Schedule a secret now, deal with the consequences later!",
  keywords: [
    "secrets",
    "friends",
    "encryption",
    "social media",
    "connect",
    "schedule",
    "algorithms",
  ],
  creator: "MeowStudios",
  generator: "Next.js",
  authors: [
    {
      name: "Alvaro Aquije",
      url: "https://x.com/@alvaro_dotdev",
    },
  ],
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={cn(GeistSans.className, "dark h-full")}>
        <NextAuthProvider>
          <TrpcProvider>{children}</TrpcProvider>

          <Toaster richColors closeButton theme="dark" visibleToasts={6} />
        </NextAuthProvider>

        <SpeedInsights />
      </body>
    </html>
  );
}
