import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Eye, Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { MySecretsList } from "../../../components/secrets/MySecretsList";

export default async function HomePage() {
  return (
    <main className="flex h-full w-full flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold tracking-tight">Secrets created by you</h1>

      <section className="flex items-center justify-between gap-2">
        <Link href="/receiving" className="focus-within:outline-none">
          <Button>
            <Eye size={20} /> Sent to me
          </Button>
        </Link>

        <Link href="/secrets/new" className="focus-within:outline-none">
          <Button>
            <Plus size={20} /> Add secret
          </Button>
        </Link>
      </section>

      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <MySecretsList />
      </Suspense>
    </main>
  );
}
