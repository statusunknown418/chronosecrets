import { Navigation } from "@/components/layout/Navigation";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <section className="relative flex h-full flex-col">
      <Navigation />

      <section className="h-full overflow-y-scroll sm:px-12 md:px-24 lg:px-44 xl:px-80">
        {children}
      </section>
    </section>
  );
}
