import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

const DynamicEditor = dynamic(() => import("@/components/secrets/SecretEditor"), {
  ssr: true,
  loading: () => (
    <div className="-mt-1 flex flex-col gap-6 text-sm">
      <div className="flex flex-col gap-1">
        <p className="font-medium">Title</p>
        <p className="h-10 rounded-lg border bg-background" />
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-medium">Revealing date</p>
        <p className="h-10 rounded-lg border bg-background" />
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-medium">Encryption type</p>
        <p className="h-10 rounded-lg border bg-background" />
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-medium">Content</p>
        <p className="h-96 rounded-lg border bg-background" />
      </div>
    </div>
  ),
});

export default function NewSecretPage() {
  return (
    <main className="flex flex-col gap-4 rounded-lg sm:mx-2 sm:px-6 sm:py-4 md:px-10">
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
        <DynamicEditor />
      </section>
    </main>
  );
}
