import { Skeleton } from "@/components/ui/skeleton";

const LoadingSharedSecret = () => {
  return (
    <div className="mt-5 flex w-full flex-col gap-4">
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-80 w-full" />
    </div>
  );
};

export default LoadingSharedSecret;
