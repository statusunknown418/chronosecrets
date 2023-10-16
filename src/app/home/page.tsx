import { SignOut } from "@/components/auth/SignOut";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { getUserAuth } from "@/lib/auth/utils";
import { Eye, Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { MySecretsList } from "../../components/secrets/MySecretsList";

export default async function HomePage() {
  const { session } = await getUserAuth();

  return (
    <main className="flex h-full flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Welcome back {session?.user.name}</h1>

      <SignOut />

      <section className="flex items-center justify-between gap-2">
        <Link href="/home/secrets/receiving" className="focus-within:outline-none">
          <Button>
            <Eye size={20} /> Sent to me
          </Button>
        </Link>

        <Link href="/home/secrets/new" className="focus-within:outline-none">
          <Button>
            <Plus size={20} /> Add secret
          </Button>
        </Link>
      </section>

      <Suspense fallback={<Spinner />}>
        <MySecretsList />
      </Suspense>
    </main>
  );
}
