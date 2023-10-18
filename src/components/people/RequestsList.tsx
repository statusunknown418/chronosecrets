"use client";
import { Requests } from "@/lib/api/user/queries";
import { trpc } from "@/lib/trpc/client";
import { RequestCard } from "./RequestCard";

export const RequestsList = ({ requests }: { requests: Requests }) => {
  const { data } = trpc.friendships.getPendingRequestsForViewer.useQuery(undefined, {
    initialData: requests,
  });

  if (data.length === 0) {
    return (
      <div className="flex min-h-[120px] items-center justify-center rounded-lg border text-muted-foreground">
        <p className="text-sm">You have no pending requests.</p>
      </div>
    );
  }

  return (
    <ul>
      {data.map((request) => (
        <RequestCard key={request.userId} request={request} />
      ))}
    </ul>
  );
};
