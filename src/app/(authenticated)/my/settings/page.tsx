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
    <main className="flex h-full flex-col gap-4 pb-10">
      <header className="sticky inset-0 z-10 flex flex-col border-b bg-background/20 p-4 backdrop-blur backdrop-filter sm:py-4">
        <h1 className="text-2xl font-bold sm:text-3xl">Settings</h1>
      </header>

      <Tabs className="px-2 pb-14 md:pb-4" defaultValue={searchParams.tab || "profile"}>
        <TabsList className="w-full justify-between md:w-max">
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

          <div className="flex justify-end self-end pt-4">
            <SignOut />
          </div>
        </TabsContent>

        <TabsContent value="chronoBucks">
          <Suspense>
            <Pricing />
          </Suspense>
        </TabsContent>

        <TabsContent value="people">
          <Tabs defaultValue="friends">
            <TabsList>
              <TabsTrigger value="friends">Friends</TabsTrigger>
              <TabsTrigger value="requests">Requests</TabsTrigger>
            </TabsList>

            <TabsContent value="friends" className="px-2">
              <h2 className="mb-4 text-lg font-bold">Your Friends</h2>

              <Suspense>
                <ServerFriendListRequests />
              </Suspense>
            </TabsContent>

            <TabsContent value="requests" className="px-2">
              <h2 className="mb-4 text-lg font-bold">Your requests</h2>

              <Suspense fallback={<Spinner />}>
                <RequestsForUser />
              </Suspense>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </main>
  );
}

const ServerFriendListRequests = async () => {
  const friends = await getAllFriendships();

  return <FriendsList friendships={friends} />;
};
