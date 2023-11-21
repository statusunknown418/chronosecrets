import { ReactNode } from "react";

export default function HomeLayout({
  children,
}: {
  children: ReactNode;
  params: { slug: string };
}) {
  return (
    <main className="flex w-full flex-col">
      <header className="sticky inset-0 z-10 flex flex-col gap-4 border-b bg-background/40 px-4 py-2 backdrop-blur backdrop-filter sm:py-4">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">My secrets</h1>
      </header>

      <div className="h-full p-4">{children}</div>
    </main>
  );
}
