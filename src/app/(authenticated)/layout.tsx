import { Navigation } from "@/components/layout/Navigation";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <section className="relative flex h-full flex-col pb-1">
      <Navigation />

      <section className="h-full overflow-y-scroll">{children}</section>
    </section>
  );
}
