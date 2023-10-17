import { FindFriends } from "@/components/friends/FindFriends";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { getFullUser } from "@/lib/auth/utils";
import Link from "next/link";
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
        {!data.username ? <UncompletedProfile /> : <FindFriends user={data} />}
      </Suspense>
    </main>
  );
}

const UncompletedProfile = () => {
  return (
    <>
      <div className="flex items-center gap-1 rounded-lg border border-yellow-800 bg-yellow-950 p-4 text-yellow-600">
        <p className="text-sm">
          Before you can add friends you need to setup a username for them to find you!
        </p>
      </div>

      <Link
        href={{
          pathname: "/my/settings",
          query: {
            goBackTo: "/home/friends",
            verifyOn: "username",
          },
        }}
        className="focus-within::ring-ring w-max rounded-lg focus-within:outline-none focus-within:ring focus-within:ring-offset-2 focus:outline-none focus:ring-offset-2 focus:ring-offset-background"
      >
        <Button>Ok, take me there!</Button>
      </Link>

      <p className="text-sm text-muted-foreground">
        DEV note: Some animation or images here to fill up space
      </p>
    </>
  );
};
