import { Requests } from "@/lib/api/user/queries";
import { trpc } from "@/lib/trpc/client";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export const RequestCard = ({ request }: { request: Requests[number] }) => {
  const ctx = trpc.useContext();

  const { mutate: accept } = trpc.friendships.acceptFriendRequest.useMutation({
    onSuccess: async () => {
      const refetching = ctx.friendships.getFriends.refetch();
      const invalidating = ctx.friendships.getAcceptedFriends.invalidate();

      await Promise.all([refetching, invalidating]);

      toast.success("Friend request accepted!", {
        description: "You can now send secrets to this person.",
      });
    },
    onMutate: async () => {
      const prev = ctx.friendships.getPendingRequestsForViewer.getData();
      const withoutCurrentRequest = prev?.filter(
        (r) => r.userId !== request.userId && r.sourceId !== request.sourceId,
      );

      ctx.friendships.getPendingRequestsForViewer.setData(
        undefined,
        withoutCurrentRequest,
      );

      return { prev };
    },
    onError: (_err, _variables, context) => {
      toast.error("Failed to accept request");
      ctx.friendships.getPendingRequestsForViewer.setData(undefined, context?.prev);
    },
  });

  const { mutate: decline } = trpc.friendships.cancelOrDeleteFriendRequest.useMutation({
    onSuccess: async () => {
      const refetching = ctx.friendships.getFriends.refetch();
      const invalidating = ctx.friendships.getPendingRequestsForViewer.invalidate();

      await Promise.all([refetching, invalidating]);

      toast.success("Friend request declined!", {
        description: "You can re-add them later",
      });
    },
    onMutate: async () => {
      const prev = ctx.friendships.getPendingRequestsForViewer.getData();
      const withoutCurrentRequest = prev?.filter(
        (r) => r.userId !== request.userId && r.sourceId !== request.sourceId,
      );

      ctx.friendships.getPendingRequestsForViewer.setData(
        undefined,
        withoutCurrentRequest,
      );

      return { prev };
    },
    onError: (_err, _variables, context) => {
      toast.error("Failed to decline request");
      ctx.friendships.getPendingRequestsForViewer.setData(undefined, context?.prev);
    },
  });

  return (
    <article
      key={request.userId}
      className="flex flex-col gap-2 rounded-lg border px-4 pb-4 pt-2 text-sm"
    >
      <header className="flex items-center justify-between">
        <p className="text-muted-foreground">{request.source.email}</p>

        <div className="flex items-center gap-2">
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => accept({ sourceId: request.sourceId, userId: request.userId })}
          >
            <Check size={16} className="text-green-500" />
          </Button>

          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() =>
              decline({ sourceId: request.sourceId, userId: request.userId })
            }
          >
            <X size={16} className="text-destructive" />
          </Button>
        </div>
      </header>

      <h4 className="font-bold tracking-wide">{request.source.name}</h4>

      <p className="font-light text-indigo-500">{request.source.username}</p>
    </article>
  );
};
