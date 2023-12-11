import { CompletedProfile } from "@/components/people/completed-profile";
import { UncompletedProfile } from "@/components/people/uncompleted-profile";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/trpc/api";
import { getVerified } from "./page";

export const ProfileChecker = async () => {
  const data = await api.user.getFullViewer.query();
  const verified = getVerified();

  if (!data) {
    return <Skeleton className="h-20 w-full" />;
  }

  if (!data?.username && !verified) {
    return <UncompletedProfile />;
  }

  return data && <CompletedProfile user={data} />;
};
