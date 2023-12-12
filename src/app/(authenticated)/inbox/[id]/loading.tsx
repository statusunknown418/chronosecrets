import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex h-full flex-col gap-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-80 w-full" />
      <Skeleton className="h-40 w-full" />
    </main>
  );
}
