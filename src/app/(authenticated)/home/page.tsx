import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Eye, Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { MySecretsList } from "../../../components/secrets/MySecretsList";

export const metadata: Metadata = {
  title: "Home",
};

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { q: string };
}) {
  return (
    <main className="flex h-full w-full flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Secrets created by you
      </h1>

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

      <Input />

      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <MySecretsList query={searchParams?.q} />
      </Suspense>
    </main>
  );
}
