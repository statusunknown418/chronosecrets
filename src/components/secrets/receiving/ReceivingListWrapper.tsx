"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { RouterOutputs } from "@/lib/server/routers/_app";
import { trpc } from "@/lib/trpc/client";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ReceivingSecretCard } from "./ReceivingSecretCard";

export const ReceivingListWrapper = ({
  initialData,
}: {
  initialData?: RouterOutputs["secrets"]["getSecretsByReceiver"];
}) => {
  const [parent] = useAutoAnimate();
  const { data, isLoading } = trpc.secrets.getSecretsByReceiver.useQuery(undefined, {
    initialData,
  });

  if (isLoading) {
    return (
      <section className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2" ref={parent}>
        {[1, 2, 3, 4, 5, 6].map((s) => (
          <Skeleton key={s} className="h-64 w-full" />
        ))}
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2" ref={parent}>
      {data?.mine.map((s) => <ReceivingSecretCard key={s.secretId} secret={s.secret} />)}
    </section>
  );
};
