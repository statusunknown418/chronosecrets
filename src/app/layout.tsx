import NextAuthProvider from "@/lib/auth/Provider";
import TrpcProvider from "@/lib/trpc/Provider";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "wait4it",
  description: "Share and receive secrets with your friends!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark h-full">
      <head>
        <Script
          async
          defer
          data-website-key="1b15c3e41fa4"
          data-api="https://event.wirelytic.com"
          src="https://wirelytic.com/script/wirelytic.min.js"
        />
      </head>

      <body className={cn(poppins.className, "h-full")}>
        <NextAuthProvider>
          <TrpcProvider>{children}</TrpcProvider>

          <Toaster richColors closeButton theme="dark" visibleToasts={9} />
        </NextAuthProvider>
      </body>
    </html>
  );
}
