"use client";
import { Requests } from "@/lib/api/user/queries";
import { trpc } from "@/lib/trpc/client";
import { RequestCard } from "./RequestCard";

export const RequestsList = ({ requests }: { requests: Requests }) => {
  const { data } = trpc.friendships.getPendingRequestsForViewer.useQuery(undefined, {
    initialData: requests,
  });

  return (
    <ul>
      {data.map((request) => (
        <RequestCard key={request.userId} request={request} />
      ))}
    </ul>
  );
};
