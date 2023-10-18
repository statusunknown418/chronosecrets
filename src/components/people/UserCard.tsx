import { FullUser } from "@/lib/db/schema";
import { trpc } from "@/lib/trpc/client";
import { CheckCircle, Plus, Timer, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export const UserCard = ({
  friend,
  alreadyFriends,
  requestPending,
}: {
  friend: FullUser;
  alreadyFriends: boolean;
  requestPending: boolean;
}) => {
  const [sent, setSent] = useState(false);
  const { data } = useSession();

  const ctx = trpc.useContext();

  const { mutate } = trpc.friendships.sendFriendRequest.useMutation({
    onMutate: (data) => {
      setSent(true);
      const prev = ctx.friendships.getFriends.getData();
      ctx.friendships.getFriends.setData(undefined, [
        ...(prev ?? []),
        {
          ...data,
          requestAccepted: false,
          friends: friend,
        },
      ]);

      return { prev };
    },
    onSuccess: () => {
      toast.success("Request sent!");
    },
    onError: (_err, _variables, context) => {
      setSent(false);
      toast.error("Failed to send request");
      ctx.friendships.getFriends.setData(undefined, context?.prev);
    },
  });

  const disableMutation = alreadyFriends || sent || requestPending;

  return (
    <article className="flex flex-col rounded-lg border p-4 text-sm">
      <div className="flex">
        <h3 className="grow text-muted-foreground">
          {friend.username || "No username 😭"}
        </h3>

        {friend.id !== data?.user.id ? (
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    data &&
                    !disableMutation &&
                    mutate({
                      sourceId: data.user.id,
                      userId: friend.id,
                    })
                  }
                >
                  {alreadyFriends ? (
                    <CheckCircle size={20} />
                  ) : sent || requestPending ? (
                    <Timer size={20} />
                  ) : (
                    <Plus size={20} />
                  )}
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                {sent || requestPending ? "Request sent" : "Send request"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <span className="text-xs font-medium">This is you!</span>
        )}

        {(requestPending || sent) && (
          <Button size={"icon"} variant={"ghost"}>
            <X size={20} />
          </Button>
        )}
      </div>

      <p>{friend.email}</p>
    </article>
  );
};
