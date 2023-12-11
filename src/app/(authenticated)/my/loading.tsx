import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingUserProfile() {
  return (
    <section className="flex h-full w-full items-center justify-center gap-4">
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-20 w-full" />
    </section>
  );
}
