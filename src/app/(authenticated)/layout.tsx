import NavigationWrapper from "@/components/layout/NavigationWrapper";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <section className="relative flex h-full w-full flex-col md:flex-row">
      <NavigationWrapper />

      <section className="h-full w-full overflow-y-scroll sm:px-12 md:px-16 md:py-2 lg:px-20 xl:px-28">
        {children}
      </section>
    </section>
  );
}
