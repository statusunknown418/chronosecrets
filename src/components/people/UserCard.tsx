import { FullUser } from "@/lib/db/schema";
import { trpc } from "@/lib/trpc/client";
import { CheckCircle, Plus, Timer, X } from "lucide-react";
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

  const disableMutation = alreadyFriends || sent || requestPending;

  return (
    <article className="flex flex-col rounded-lg border p-4 text-sm">
      <div className="flex">
        <h3 className="grow text-muted-foreground">
          {friend.username || "No username 😭"}
        </h3>

        {friend.id !== data?.user.id ? (
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
