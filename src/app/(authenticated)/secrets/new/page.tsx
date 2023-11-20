import SecretForm from "@/components/secrets/SecretForm";
import { BypassingBanner } from "@/components/secrets/edit/BypassingBanner";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export const metadata = {
  title: "New",
};

export default function NewSecretPage() {
  return (
    <main className="flex w-full flex-col gap-4 rounded-lg">
      <section className="sticky inset-0 z-10 flex w-full flex-col gap-2 border-b bg-background/20 px-4 py-2 backdrop-blur backdrop-filter sm:py-4">
        <header className="flex w-full items-center justify-between gap-4">
          <h1 className="text-2xl font-bold capitalize sm:text-3xl">New secret</h1>

          <Link href="/home" className="focus-within:outline-none">
            <Button variant="ghost" size="icon">
              <X size={20} className="text-muted-foreground" />
            </Button>
          </Link>
        </header>
      </section>

      <Suspense>
        <BypassingBanner />
      </Suspense>

      <section className="w-full px-4">
        <Suspense>
          <SecretForm />
        </Suspense>
      </section>
    </main>
  );
}
