import { Navigation } from "@/components/layout/Navigation";
import { ReactNode } from "react";

// const DynamicRocketDropdown = dynamic(() => import("@/components/home/BypassingLink"));

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <section className="relative flex h-full w-full flex-col">
      <Navigation />

      <section className="h-full w-full overflow-y-scroll sm:px-12 md:px-24 lg:px-40 xl:px-72">
        {children}
      </section>

      {/* <DynamicRocketDropdown /> */}
    </section>
  );
}
