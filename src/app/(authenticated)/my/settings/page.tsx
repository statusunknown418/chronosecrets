import { SignOut } from "@/components/auth/SignOut";
import { FriendsList } from "@/components/my/FriendsList";
import HydrateSettingsForm from "@/components/my/HydrateSettingsForm";
import { RequestsForUser } from "@/components/my/requests-for-user";
import { Spinner } from "@/components/ui/spinner";
import { getAllFriendships } from "@/lib/api/friendships/queries";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Me",
};

export default async function MySettings() {
  return (
    <main className="flex h-full flex-col gap-4">
      <header className="sticky inset-0 z-10 flex flex-col bg-background/20 backdrop-blur backdrop-filter">
        <h1 className="border-b px-4 py-3 text-2xl font-bold">My Settings</h1>
      </header>

      <section className="flex flex-col gap-4 px-4">
        <Suspense
          fallback={
            <div className="flex h-full items-center justify-center">
              <Spinner />
            </div>
          }
        >
          <HydrateSettingsForm />
        </Suspense>

        <h2 className="border-b py-2 text-xl font-bold">Friends & Requests</h2>
        <ServerFriendListRequests />

        <h2 className="font-bold">Your requests</h2>
        <Suspense fallback={<Spinner />}>
          <RequestsForUser />
        </Suspense>

        <hr className="bg-border" />

        <SignOut />
      </section>
    </main>
  );
}

const ServerFriendListRequests = async () => {
  const friends = await getAllFriendships();

  return (
    <Suspense>
      <FriendsList friendships={friends} />
    </Suspense>
  );
};
