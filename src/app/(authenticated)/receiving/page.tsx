import { ReceivingList } from "@/components/secrets/receiving/ReceivingList";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { X } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sent to Me",
};

export default function ReceivingSecretsPage() {
  return (
    <main className="flex flex-col gap-4">
      <section className="sticky inset-0 z-10 flex flex-col gap-2 border-b bg-background/20 px-4 py-3 backdrop-blur backdrop-filter">
        <header className="flex w-full items-center justify-between gap-4">
          <h1 className="text-2xl font-bold capitalize tracking-tight">Sent to you</h1>

          <Link href="/home" className="focus-within:outline-none">
            <Button variant="ghost" size="icon">
              <X size={20} className="text-muted-foreground" />
            </Button>
          </Link>
        </header>
      </section>

      <Suspense
        fallback={
          <div className="flex h-full flex-col items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <ReceivingList />
      </Suspense>
    </main>
  );
}
