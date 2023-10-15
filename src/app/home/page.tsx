import { SignOut } from "@/components/auth/SignOut";
import { getSecrets } from "@/lib/api/secrets/queries";
import { getUserAuth } from "@/lib/auth/utils";
import { Suspense } from "react";
import { MySecretsList } from "../../components/secrets/MySecretsList";

export default async function HomePage() {
  const t1 = Date.now();
  const userPromise = getUserAuth();
  const secretsPromise = getSecrets();

  const [user, { secrets }] = await Promise.all([userPromise, secretsPromise]);
  const t2 = Date.now();

  return (
    <main className="flex h-full flex-col gap-4 px-4">
      <h1 className="text-2xl font-bold">Welcome back {user.session?.user.name}</h1>
      <p>Took: {t2 - t1}</p>

      <SignOut />

      <Suspense>
        <MySecretsList secrets={secrets} />
      </Suspense>
    </main>
  );
}
