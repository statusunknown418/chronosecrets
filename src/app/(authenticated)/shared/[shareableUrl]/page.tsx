import Tiptap from "@/components/secrets/Tiptap";
import { Button } from "@/components/ui/button";
import {
  buildFullShareableUrl,
  getSecretByShareableUrl,
} from "@/lib/api/secrets/queries";
import { X } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function ShareableUrlPage({
  params: { shareableUrl },
  searchParams: { wasEditing },
}: {
  params: {
    shareableUrl: string;
  };
  searchParams: {
    wasEditing?: string;
  };
}) {
  const fullUrl = buildFullShareableUrl(shareableUrl);
  const { shared } = await getSecretByShareableUrl(fullUrl);

  return (
    <main className="flex flex-col gap-4">
      <header className="sticky inset-0 z-10 flex flex-col gap-2 border-b bg-background/20 px-4 py-3 backdrop-blur backdrop-filter">
        <span className="w-max rounded-full border border-indigo-800 bg-indigo-950 px-4 py-1.5 text-xs text-indigo-500">
          Shared
        </span>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold capitalize">{shared.title}</h1>

          {wasEditing && (
            <Link href={`/secrets/${shared.id}`}>
              <Button variant="ghost" size="icon">
                <X size={20} className="text-muted-foreground" />
              </Button>
            </Link>
          )}
        </div>
      </header>

      <div className="px-4">
        <Suspense>
          <Tiptap content={shared.content} />
        </Suspense>
      </div>
    </main>
  );
}
