import { CompletedProfile } from "@/components/people/completed-profile";
import { UncompletedProfile } from "@/components/people/uncompleted-profile";
import { Spinner } from "@/components/ui/spinner";
import { getFullUser } from "@/lib/auth/utils";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function FriendshipsPage({
  searchParams,
}: {
  searchParams?: { verified: boolean; q: string };
}) {
  const data = await getFullUser();

  if (!data) {
    redirect("/api/auth/signin");
  }

  return (
    <main className="flex h-full flex-col gap-4 p-4">
      <h1 className="text-xl font-bold">Friends</h1>

      {!data.username && !searchParams?.verified ? (
        <UncompletedProfile />
      ) : (
        <Suspense
          fallback={
            <section className="flex h-full w-full items-center justify-center gap-2">
              <Spinner />
              <h3>Skeleton</h3>
            </section>
          }
        >
          <CompletedProfile user={data} />
        </Suspense>
      )}
    </main>
  );
}
