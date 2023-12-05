import { MainContent } from "@/components/layout/MainContent";
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
    <MainContent className="px-2 pb-14 md:pb-0">
      <Suspense
        fallback={
          <section className="flex h-full w-full items-center justify-center gap-2">
            <Spinner />
          </section>
        }
      >
        <ProfileChecker />
      </Suspense>
    </MainContent>
  );
}
