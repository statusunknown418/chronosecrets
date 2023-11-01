import NextAuthProvider from "@/lib/auth/Provider";
import TrpcProvider from "@/lib/trpc/Provider";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { GeistSans } from "geist/font";
import type { Metadata } from "next";
import Script from "next/script";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "ChronoSecrets",
    template: "%s / ChronoSecrets",
  },
  description: "Send a secret now, deal with the consequences later!",
  keywords: ["secrets", "friends", "encryption", "social media", "connect", "schedule"],
  colorScheme: "dark light",
  creator: "Alvaro Aquije",
  authors: [
    {
      name: "Alvaro Aquije",
      url: "https://x.com/@alvaro_dotdev",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark h-full bg-background">
      <head>
        <Script
          async
          defer
          data-website-key="1b15c3e41fa4"
          data-api="https://event.wirelytic.com"
          src="https://wirelytic.com/script/wirelytic.min.js"
        />
      </head>

      <body className={cn(GeistSans.className, "h-full")}>
        <NextAuthProvider>
          <TrpcProvider>{children}</TrpcProvider>

          <Toaster richColors closeButton theme="dark" visibleToasts={9} />
        </NextAuthProvider>
      </body>
    </html>
  );
}
