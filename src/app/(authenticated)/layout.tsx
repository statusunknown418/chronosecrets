import NavigationWrapper from "@/components/layout/NavigationWrapper";
import { PageHeader } from "@/components/layout/PageHeader";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <section className="relative flex h-full w-full flex-col md:flex-row">
      <NavigationWrapper />

      <section className="h-full w-full overflow-y-scroll">
        <PageHeader />

        <section className="h-[calc(100%-60px)] px-4 sm:px-12 md:px-12">
          {children}
        </section>
      </section>
    </section>
  );
}
