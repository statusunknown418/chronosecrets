import NextAuthProvider from "@/lib/auth/Provider";
import { getUserAuth } from "@/lib/auth/utils";
import TrpcProvider from "@/lib/trpc/Provider";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const auth = await getUserAuth();

  return (
    <html lang="en" className="h-full">
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
        <NextAuthProvider session={auth.session || undefined}>
          <TrpcProvider>{children}</TrpcProvider>

          <Toaster richColors closeButton theme="dark" visibleToasts={6} />
        </NextAuthProvider>
      </body>
    </html>
  );
}
