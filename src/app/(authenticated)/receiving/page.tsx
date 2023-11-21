import { ReceivingList } from "@/components/secrets/receiving/receiving-list";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { X } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sent to Me",
};

export default function ReceivingSecretsPage() {
  return (
    <>
      <section className="sticky inset-0 z-10 flex flex-col gap-2 border-b bg-background/20 px-4 py-2 backdrop-blur backdrop-filter sm:py-4">
        <header className="flex w-full items-center justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Sent to me</h1>

          <Link href="/home" className="focus-within:outline-none">
            <Button variant="ghost" size="icon">
              <X size={20} className="text-muted-foreground" />
            </Button>
          </Link>
        </header>
      </section>

      <section className="h-full w-full pb-16">
        <Suspense
          fallback={
            <section className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2">
              {[1, 2, 3, 4, 5, 6].map((s) => (
                <Skeleton key={s} className="h-64 w-full" />
              ))}
            </section>
          }
        >
          <ReceivingList />
        </Suspense>
      </section>
    </>
  );
}
