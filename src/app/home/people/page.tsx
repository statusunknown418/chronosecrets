import { CompletedProfile } from "@/components/people/completed-profile";
import { UncompletedProfile } from "@/components/people/uncomplete-profile";
import { Spinner } from "@/components/ui/spinner";
import { getFullUser } from "@/lib/auth/utils";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function FriendshipsPage() {
  const data = await getFullUser();

  if (!data) {
    redirect("/api/auth/signin");
  }

  return (
    <main className="flex h-full flex-col gap-4 p-4">
      <h1 className="text-xl font-bold">Friends</h1>

      <Suspense fallback={<Spinner />}>
        {!data.username ? <UncompletedProfile /> : <CompletedProfile user={data} />}
      </Suspense>
    </main>
  );
}
