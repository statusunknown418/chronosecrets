import { MainContent } from "@/components/layout/MainContent";
import { PageHeader } from "@/components/layout/PageHeader";
import { Spinner } from "@/components/ui/spinner";
import { Metadata } from "next";
import { Suspense } from "react";
import { ProfileChecker } from "./profile-checker";

export const metadata: Metadata = {
  title: {
    absolute: "Search for friends",
  },
};

export default async function SearchPage() {
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
          <ProfileChecker />
        </Suspense>
      </div>
    </MainContent>
  );
}
