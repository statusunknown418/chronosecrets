import { SignOut } from "@/components/auth/SignOut";
import { MainContent } from "@/components/layout/MainContent";
import HydrateSettingsForm from "@/components/my/HydrateSettingsForm";
import { Pricing } from "@/components/my/Pricing";
import { RequestsForUser } from "@/components/my/requests-for-user";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";
import { Suspense } from "react";
import { ServerFriendListRequests } from "./server-friend-list";
import { TabsWrapper } from "./tab-wrapper";

export const metadata: Metadata = {
  title: "Me",
};

export default function MySettings() {
  return (
    <MainContent>
      <Suspense
        fallback={
          <div className="flex w-full items-center gap-2">
            <Skeleton className="w-20" />
            <Skeleton className="w-20" />
          </div>
        }
      >
        <TabsWrapper>
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
        </TabsWrapper>
      </Suspense>
    </MainContent>
  );
}
