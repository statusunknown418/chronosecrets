import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <section className="flex h-full flex-col pb-4">
      <nav className="p-4">Navigation here</nav>
      {children}
    </section>
  );
}
