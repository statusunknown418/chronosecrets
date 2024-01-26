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
  metadataBase: new URL("https://wait4it.vercel.app"),
  keywords: [
    "secrets",
    "friends",
    "encryption",
    "social media",
    "connect",
    "schedule",
    "algorithms",
    "messages",
  ],
  creator: "MeowStudios",
  generator: "Next.js",
  authors: [
    {
      name: "Alvaro Aquije",
      url: "https://x.com/@alvaro_dotdev",
    },
    {
      name: "Francisco Garcia",
      url: "https://www.instagram.com/francisco19_03",
    },
  ],
  openGraph: {
    type: "website",
    description: "Schedule a secret now, deal with the consequences later!",
    locale: "en_US",
    url: "https://wait4it.vercel.app",
    images: [new URL("https://wait4it.vercel.app/twitter-image.png")],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@alvaro_dotdev",
    site: "@alvaro_dotdev",
    images: [
      {
        url: "https://wait4it.vercel.app/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "ChronoSecrets",
      },
    ],
  },
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
