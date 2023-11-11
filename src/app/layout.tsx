import NextAuthProvider from "@/lib/auth/Provider";
import TrpcProvider from "@/lib/trpc/Provider";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { GeistSans } from "geist/font";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "ChronoSecrets",
    template: "%s / ChronoSecrets",
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
  creator: "Alvaro Aquije",
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full dark:bg-background">
      <head>
        <Script
          async
          defer
          data-website-key="1b15c3e41fa4"
          data-api="https://event.wirelytic.com"
          src="https://wirelytic.com/script/wirelytic.min.js"
        />
      </head>

      <body className={cn(GeistSans.className, "dark h-full")}>
        <NextAuthProvider>
          <TrpcProvider>{children}</TrpcProvider>

          <Toaster richColors closeButton theme="dark" visibleToasts={9} />
        </NextAuthProvider>
      </body>
    </html>
  );
}
