import { MainContent } from "@/components/layout/MainContent";
import { Skeleton } from "@/components/ui/skeleton";
import serverOnlyContext from "@/lib/hooks/server-only-context";
import { Metadata } from "next";
import { Suspense } from "react";
import { ProfileChecker } from "./profile-checker";

export const metadata: Metadata = {
  title: {
    absolute: "Search for friends",
  },
};

export const [getVerified, setVerified] = serverOnlyContext(false);

export default function SearchPage({
  params: { verified },
}: {
  params: { verified: string };
}) {
  setVerified(Boolean(verified));

  return (
    <MainContent className="px-2 pb-14">
      <Suspense
        fallback={
          <section className="flex h-full w-full items-center justify-center gap-2">
            <Skeleton className="h-20 w-full" />
          </section>
        }
      >
        <ProfileChecker />
      </Suspense>
    </MainContent>
  );
}
