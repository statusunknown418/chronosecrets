import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSecretById() {
  return (
    <div className="mt-2 flex h-full w-full flex-col gap-4">
      <Skeleton className="h-20 w-full" />
      <Separator />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-56 w-full" />
    </div>
  );
}
