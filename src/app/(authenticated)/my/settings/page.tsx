import { SignOut } from "@/components/auth/SignOut";
import { FriendsList } from "@/components/my/FriendsList";
import HydrateSettingsForm from "@/components/my/HydrateSettingsForm";
import { Pricing } from "@/components/my/Pricing";
import { RequestsForUser } from "@/components/my/requests-for-user";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllFriendships } from "@/lib/api/friendships/queries";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Me",
};

export default async function MySettings({
  searchParams,
}: {
  searchParams: {
    tab?: string;
  };
}) {
  return (
    <main className="flex h-full flex-col gap-4">
      <header className="sticky inset-0 z-10 flex flex-col bg-background/20 backdrop-blur backdrop-filter">
        <h1 className="border-b px-4 py-3 text-2xl font-bold">My Settings</h1>
      </header>

      <Tabs className="px-2" defaultValue={searchParams.tab || "profile"}>
        <TabsList className="w-full justify-between">
          <TabsTrigger value="profile" className="w-full">
            Profile
          </TabsTrigger>

          <TabsTrigger value="chronoBucks" className="w-full">
            ChronoBucks
          </TabsTrigger>

          <TabsTrigger value="people" className="w-full">
            People
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center">
                <Spinner />
              </div>
            }
          >
            <HydrateSettingsForm />
          </Suspense>

          <div className="pt-4">
            <SignOut />
          </div>
        </TabsContent>

        <TabsContent value="chronoBucks">
          <Suspense>
            <Pricing />
          </Suspense>
        </TabsContent>

        <TabsContent value="people">
          <section className="flex flex-col gap-4 px-2">
            <h2 className="text-lg font-bold">Friends</h2>

            <Suspense>
              <ServerFriendListRequests />
            </Suspense>

            <h2 className="text-lg font-bold">Your requests</h2>
            <Suspense fallback={<Spinner />}>
              <RequestsForUser />
            </Suspense>

            <hr className="bg-border" />
          </section>
        </TabsContent>
      </Tabs>
    </main>
  );
}

const ServerFriendListRequests = async () => {
  const friends = await getAllFriendships();

  return <FriendsList friendships={friends} />;
};
