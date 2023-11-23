import { MainContent } from "@/components/layout/MainContent";
import { PageHeader } from "@/components/layout/PageHeader";
import { CompletedProfile } from "@/components/people/completed-profile";
import { UncompletedProfile } from "@/components/people/uncompleted-profile";
import { Spinner } from "@/components/ui/spinner";
import { getFullUser } from "@/lib/auth/utils";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    absolute: "Search for friends",
  },
};

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
    <MainContent>
      <PageHeader title="Search" />

      <div className="flex h-full flex-col gap-4 px-4">
        <Suspense
          fallback={
            <section className="flex h-full w-full items-center justify-center gap-2">
              <Spinner />
            </section>
          }
        >
          {!data.username && !searchParams?.verified ? (
            <UncompletedProfile />
          ) : (
            <CompletedProfile user={data} />
          )}
        </Suspense>
      </div>
    </MainContent>
  );
}
