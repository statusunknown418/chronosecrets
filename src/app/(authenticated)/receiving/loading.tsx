import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { X } from "lucide-react";
import Link from "next/link";

export default function LoadingAllReceivingPage() {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <section className="sticky inset-0 z-10 flex flex-col gap-2 border-b bg-background/20 px-4 py-2 backdrop-blur backdrop-filter sm:py-4">
        <header className="flex w-full items-center justify-between gap-4">
          <h1 className="text-2xl font-bold capitalize tracking-tight sm:text-3xl">
            Sent to you
          </h1>

          <Link href="/home" className="focus-within:outline-none">
            <Button variant="ghost" size="icon">
              <X size={20} className="text-muted-foreground" />
            </Button>
          </Link>
        </header>
      </section>

      <Spinner />
    </div>
  );
}