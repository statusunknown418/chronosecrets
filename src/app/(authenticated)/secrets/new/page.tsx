import SecretForm from "@/components/secrets/SecretForm";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function NewSecretPage() {
  return (
    <main className="flex flex-col gap-4 rounded-lg">
      <section className="sticky inset-0 z-10 flex flex-col gap-2 border-b bg-background/20 px-4 py-2 backdrop-blur backdrop-filter">
        <header className="flex w-full items-center justify-between gap-4">
          <h1 className="text-2xl font-bold capitalize">New secret</h1>

          <Link href="/home" className="focus-within:outline-none">
            <Button variant="ghost" size="icon">
              <X size={20} className="text-muted-foreground" />
            </Button>
          </Link>
        </header>
      </section>

      <section className="px-4">
        <Suspense>
          <SecretForm />
        </Suspense>
      </section>
    </main>
  );
}
