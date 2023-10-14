import NextAuthProvider from "@/lib/auth/Provider";
import TrpcProvider from "@/lib/trpc/Provider";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  // weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "wait4it",
  description: "Share and receive secrets with your friends!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark bg-zinc-900">
      <head>
        <Script
          async
          defer
          data-website-key="1b15c3e41fa4"
          data-api="https://event.wirelytic.com"
          src="https://wirelytic.com/script/wirelytic.min.js"
        />
      </head>

      <body className={inter.className}>
        <NextAuthProvider>
          <TrpcProvider>{children}</TrpcProvider>

          <Toaster />
        </NextAuthProvider>
      </body>
    </html>
  );
}
