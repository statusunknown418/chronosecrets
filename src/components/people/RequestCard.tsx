import { Requests } from "@/lib/api/user/queries";
import { trpc } from "@/lib/trpc/client";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export const RequestCard = ({ request }: { request: Requests[number] }) => {
  const ctx = trpc.useContext();

  const { mutate: accept } = trpc.friendships.acceptFriendRequest.useMutation({
    onSuccess: async () => {
      await ctx.friendships.getFriends.refetch();
      toast.success("Friend request accepted!");
    },
    onMutate: async () => {
      const prev = ctx.friendships.getPendingRequestsForViewer.getData();

      ctx.friendships.getPendingRequestsForViewer.setData(
        undefined,
        prev?.filter(
          (r) => r.userId !== request.userId && r.sourceId !== request.sourceId,
        ),
      );

      return { prev };
    },
    onError: (_err, _variables, context) => {
      toast.error("Failed to accept request");
      ctx.friendships.getPendingRequestsForViewer.setData(undefined, context?.prev);
    },
  });

  return (
    <li
      key={request.userId}
      className="flex h-full items-center justify-between rounded-lg border text-sm"
    >
      <Button
        variant={"ghost"}
        className="h-full"
        onClick={() => accept({ sourceId: request.sourceId, userId: request.userId })}
      >
        <Check size={16} />
      </Button>

      <div className="flex flex-col gap-2 py-3">
        <p>{request.friends.name}</p>
        <p>{request.friends.username}</p>
        <p className="text-muted-foreground">{request.friends.email}</p>
      </div>

      <Button variant={"ghost"} className="h-full">
        <X size={16} className="text-destructive" />
      </Button>
    </li>
  );
};
