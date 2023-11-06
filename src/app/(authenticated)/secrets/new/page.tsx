import SecretForm from "@/components/secrets/SecretForm";
import { Button } from "@/components/ui/button";
import { AlertCircle, X } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export const metadata = {
  title: "New",
};

export default function NewSecretPage({
  searchParams,
}: {
  searchParams: {
    bypass: string;
    sendingId: string;
    sendingUsername: string;
  };
}) {
  return (
    <main className="flex w-full flex-col gap-4 rounded-lg">
      <section className="sticky inset-0 z-10 flex w-full flex-col gap-2 border-b bg-background/20 px-4 py-2 backdrop-blur backdrop-filter">
        <header className="flex w-full items-center justify-between gap-4">
          <h1 className="text-2xl font-bold capitalize">New secret</h1>

          <Link href="/home" className="focus-within:outline-none">
            <Button variant="ghost" size="icon">
              <X size={20} className="text-muted-foreground" />
            </Button>
          </Link>
        </header>
      </section>

      {searchParams.bypass && (
        <div className="mx-4 mb-4 flex items-start gap-2 rounded-lg border border-yellow-500/50 bg-yellow-900/40 p-3 text-xs text-yellow-200/80 sm:items-center sm:text-sm">
          <span className="pt-0.5">
            <AlertCircle size={14} />
          </span>

          <span>
            Heads up - The current link is bypassing the normal flow and thus you&apos;ll
            only be able to send this secret to{" "}
            <span className="text-yellow-50">{searchParams.sendingUsername}!</span>
          </span>
        </div>
      )}

      <section className="w-full px-4">
        <Suspense>
          <SecretForm />
        </Suspense>
      </section>
    </main>
  );
}
