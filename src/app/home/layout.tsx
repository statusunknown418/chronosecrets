import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <section className="relative flex h-full flex-col pb-4">
      <nav className="sticky inset-0 z-10 border-b bg-muted/20 p-4 backdrop-blur backdrop-filter">
        Navigation here
      </nav>

      <section className="h-full overflow-y-scroll">{children}</section>
    </section>
  );
}
