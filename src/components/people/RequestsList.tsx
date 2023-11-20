"use client";
import { Requests } from "@/lib/api/user/queries";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import { RequestCard } from "./RequestCard";

export const RequestsList = ({ requests }: { requests: Requests }) => {
  const { data } = trpc.friendships.getPendingRequestsForViewer.useQuery(undefined, {
    initialData: requests,
  });

  if (data.people?.length === 0) {
    return (
      <div className="flex min-h-[120px] items-center justify-center rounded-lg border border-dashed text-muted-foreground">
        <p className="text-sm">You have no pending requests.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <section className={cn("grid grid-cols-1 gap-4 overflow-y-scroll md:grid-cols-2")}>
        {data.people?.map((request) => (
          <RequestCard
            key={request.sourceId === data.viewer.id ? request.userId : request.sourceId}
            request={request}
          />
        ))}
      </section>

      {data.people?.length > 2 && (
        <div className="absolute -bottom-3 left-0 flex h-3 w-full flex-col items-center justify-center bg-black/60 blur" />
      )}
    </div>
  );
};
