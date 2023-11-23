"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc/client";
import Image from "next/image";

export const QuickUserImage = () => {
  const { data, isLoading } = trpc.user.getFullViewer.useQuery();

  if (!data || isLoading) return <Skeleton className="mr-1 h-14 w-14 rounded-full" />;

  return (
    data.image && (
      <Image
        src={data?.image}
        alt={data.username || ""}
        width={56}
        height={56}
        className="rounded-full"
      />
    )
  );
};
