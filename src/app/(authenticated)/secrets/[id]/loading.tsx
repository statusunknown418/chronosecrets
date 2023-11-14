import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

export default function LoadingSecretById() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Skeleton />
      <Spinner />
    </div>
  );
}
