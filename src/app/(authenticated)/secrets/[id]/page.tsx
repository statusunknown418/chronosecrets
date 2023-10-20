import { Button } from "@/components/ui/button";
import { getSecretById } from "@/lib/api/secrets/queries";
import { X } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";

const DynamicSecretForm = dynamic(() => import("@/components/secrets/SecretForm"), {
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

export default async function SecretSlugPage({
  params: { id },
}: {
  params: {
    id: string;
    editing?: string;
  };
}) {
  const { secret } = await getSecretById(Number(id));

  return (
    <main className="flex flex-col gap-5">
      <section className="sticky inset-0 z-10 flex flex-col gap-2 border-b bg-background px-4 pb-4">
        <span className="w-max rounded-full border border-blue-800 bg-blue-950 px-4 py-1.5 text-xs text-blue-500">
          Editing
        </span>

        <header className="flex w-full items-start justify-between gap-4">
          <h1 className="font-serif text-2xl font-bold capitalize">{secret.title}</h1>

          <Link href="/home" className="focus-within:outline-none">
            <Button variant="ghost" size="icon">
              <X size={20} className="text-muted-foreground" />
            </Button>
          </Link>
        </header>
      </section>

      <section className="px-4">
        <Suspense>
          <DynamicSecretForm secret={secret} />
        </Suspense>
      </section>
    </main>
  );
}
