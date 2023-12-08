import { Skeleton } from "@/components/ui/skeleton";

export default function AuthenticatedLoader() {
  return (
    <div className="flex h-full flex-col gap-5">
      <Skeleton className="h-40 w-full" />
    </div>
  );
}
