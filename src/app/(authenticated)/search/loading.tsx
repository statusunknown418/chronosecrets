import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingHome() {
  return (
    <div className="flex flex-col">
      <Skeleton className="h-20 w-full" />
    </div>
  );
}
