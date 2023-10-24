import { Navigation } from "@/components/layout/Navigation";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <section className="relative flex h-full flex-col pb-1">
      <Navigation />

      <section className="h-full min-w-full max-w-2xl overflow-y-scroll sm:mx-auto md:min-w-[672px]">
        {children}
      </section>
    </section>
  );
}
