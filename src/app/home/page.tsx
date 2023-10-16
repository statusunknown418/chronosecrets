import { SignOut } from "@/components/auth/SignOut";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { getUserAuth } from "@/lib/auth/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { MySecretsList } from "../../components/secrets/MySecretsList";

export default async function HomePage() {
  const { session } = await getUserAuth();

  return (
    <main className="flex h-full flex-col gap-4 px-4">
      <h1 className="text-2xl font-bold">Welcome back {session?.user.name}</h1>

      <SignOut />

      <Link href="/home/secrets/new">
        <Button>
          <Plus size={20} /> Add secret
        </Button>
      </Link>

      <Suspense fallback={<Spinner />}>
        <MySecretsList />
      </Suspense>
    </main>
  );
}
