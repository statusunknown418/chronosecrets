"use client";

import { useReceiverDataStore } from "@/lib/hooks/useReceiverDataStore";
import { trpc } from "@/lib/trpc/client";

export const Sync = ({ userId }: { userId: string }) => {
  const syncReceiver = useReceiverDataStore((s) => s.setReceiverData);

  trpc.user.getSafeUserById.useQuery(userId, {
    enabled: !!userId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onSuccess: (data) => {
      syncReceiver(data!);
    },
  });

  return <div hidden />;
};
