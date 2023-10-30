import { FullUser } from "@/lib/db/schema";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import { CheckCircle, Clock, Plus, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

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
    onMutate: (mutationData) => {
      setSent(true);
      const prev = ctx.friendships.getFriends.getData();

      if (!data?.user) return { prev };

      const prevSource = {
        ...data.user,
        email: data.user.email || "",
        name: data.user.name || "",
        image: data.user.image || "",
      };

      ctx.friendships.getFriends.setData(undefined, {
        viewer: prev?.viewer ?? data.user,
        people: [
          ...(prev?.people ?? []),
          {
            ...mutationData,
            requestAccepted: false,
            friends: friend,
            source: prevSource,
          },
        ],
      });

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

  const { mutate: cancel } = trpc.friendships.cancelOrDeleteFriendRequest.useMutation({
    onMutate: () => {
      setSent(false);
    },
    onSuccess: () => {
      ctx.user.invalidate();
      toast.message("Request cancelled!");
    },
    onError: () => {
      toast.error("Failed to cancel request");
    },
  });

  const disableMutation = alreadyFriends || sent || requestPending;

  if (!data) return;

  return (
    <article className={cn("flex flex-col gap-3 rounded-lg border p-4 text-sm")}>
      <div className="flex max-h-6 items-center">
        <h3 className="grow text-muted-foreground">
          {friend.username || "No username 😭"}
        </h3>

        {friend.id !== data?.user.id ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              data &&
                !disableMutation &&
                mutate({
                  sourceId: data.user.id,
                  userId: friend.id,
                });
            }}
          >
            {alreadyFriends ? (
              <CheckCircle size={16} className="text-green-500" />
            ) : sent || requestPending ? (
              <Clock size={16} className="text-yellow-500" />
            ) : (
              <Plus size={16} className="text-blue-500" />
            )}
          </Button>
        ) : (
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            You
          </span>
        )}

        {(requestPending || sent) && !alreadyFriends && data?.user.id !== friend.id && (
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => {
              cancel({
                sourceId: data.user.id,
                userId: friend.id,
              });
            }}
          >
            <X size={16} className="text-destructive" />
          </Button>
        )}
      </div>

      <h3 className="capitalize">{friend.name}</h3>

      <p className="text-indigo-500">{friend.email}</p>
    </article>
  );
};
