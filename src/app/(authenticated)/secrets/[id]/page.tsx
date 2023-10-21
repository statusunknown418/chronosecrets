import { QuickShare } from "@/components/secrets/QuickShare";
import { EditMenu } from "@/components/secrets/edit/EditMenu";
import { Button } from "@/components/ui/button";
import { getSecretById } from "@/lib/api/secrets/queries";
import { Eye, X } from "lucide-react";
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
    <main className="flex flex-col gap-4">
      <section className="sticky inset-0 z-10 flex flex-col gap-2 border-b bg-background/20 px-4 pb-3 backdrop-blur backdrop-filter">
        <span className="w-max rounded-full border border-blue-800 bg-blue-950 px-4 py-1 text-xs text-blue-500">
          Editing
        </span>

        <header className="items-ce flex w-full justify-between gap-2 sm:items-center sm:gap-5">
          <div className="flex items-center gap-1 sm:gap-2">
            <h1 className="break-words text-2xl font-bold capitalize">{secret.title}</h1>

            <div className="hidden sm:flex sm:items-center">
              <QuickShare url={secret.shareableUrl} />

              <Link href={secret.shareableUrl} passHref>
                <Button variant={"ghost"} size={"icon"}>
                  <Eye size={20} className="text-muted-foreground" />
                </Button>
              </Link>
            </div>
          </div>

          <Link href="/home" className="hidden focus-within:outline-none sm:flex">
            <Button variant="ghost" size="icon">
              <X size={20} className="text-muted-foreground" />
            </Button>
          </Link>

          <EditMenu secret={secret} />
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
