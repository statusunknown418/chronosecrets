"use client";

import { useReceiverDataStore } from "@/lib/hooks/useReceiverDataStore";
import { trpc } from "@/lib/trpc/client";
import { useEffect } from "react";

export const Sync = ({ userId }: { userId?: string }) => {
  const clear = useReceiverDataStore((s) => s.clear);
  const syncReceiver = useReceiverDataStore((s) => s.setReceiverData);

  const { data, isLoading } = trpc.user.getSafeUserById.useQuery(userId || "", {
    enabled: !!userId,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (!userId) return clear();

    if (!data || isLoading) return;

    syncReceiver(data);
  }, [clear, data, isLoading, syncReceiver, userId]);

  return <div hidden />;
};
