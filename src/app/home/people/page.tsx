import { CompletedProfile } from "@/components/people/completed-profile";
import { UncompletedProfile } from "@/components/people/uncompleted-profile";
import { getFullUser } from "@/lib/auth/utils";
import { redirect } from "next/navigation";

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
        <CompletedProfile user={data} />
      )}
    </main>
  );
}
