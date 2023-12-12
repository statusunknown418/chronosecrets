import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingUserProfile() {
  return (
    <section className="flex h-full w-full flex-col items-center gap-4">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
    </section>
  );
}
