import { CompletedProfile } from "@/components/people/completed-profile";
import { UncompletedProfile } from "@/components/people/uncompleted-profile";
import { Skeleton } from "@/components/ui/skeleton";
import { getFullUser } from "@/lib/auth/utils";
import { getVerified } from "@/lib/hooks/server-only-context";

export const ProfileChecker = async () => {
  const data = await getFullUser();
  const verified = getVerified();

  if (!data) {
    return <Skeleton className="h-20 w-full" />;
  }

  if (!data?.username && !verified) {
    return <UncompletedProfile />;
  }

  return data && <CompletedProfile user={data} />;
};
