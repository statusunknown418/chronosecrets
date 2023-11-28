"use client";
import { CompletedProfile } from "@/components/people/completed-profile";
import { UncompletedProfile } from "@/components/people/uncompleted-profile";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc/client";
import { useSearchParams } from "next/navigation";

export const ProfileChecker = () => {
  const { data, isLoading } = trpc.user.getFullViewer.useQuery(undefined, {
    refetchOnMount: false,
  });

  const verified = useSearchParams().get("verified");

  if (isLoading) {
    return <Skeleton className="h-20 w-full" />;
  }

  if (!data?.username && !verified) {
    return <UncompletedProfile />;
  }

  return data && <CompletedProfile user={data} />;
};
