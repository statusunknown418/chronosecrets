import { SignOut } from "@/components/auth/SignOut";
import { Spinner } from "@/components/ui/spinner";
import { getUserAuth } from "@/lib/auth/utils";
import { Suspense } from "react";
import { MySecretsList } from "../../components/secrets/MySecretsList";

export default async function HomePage() {
  const { session } = await getUserAuth();

  return (
    <main className="flex h-full flex-col gap-4 px-4">
      <h1 className="text-2xl font-bold">Welcome back {session?.user.name}</h1>

      <SignOut />

      <Suspense fallback={<Spinner />}>
        <MySecretsList />
      </Suspense>
    </main>
  );
}
