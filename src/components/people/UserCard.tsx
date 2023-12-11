import { FullUser } from "@/lib/db/schema";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import { CheckCircle, Clock, Plus, X } from "lucide-react";
import Image from "next/image";
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
  const { data } = trpc.user.getFullViewer.useQuery();

  const ctx = trpc.useUtils();

  const { mutate: notify } = trpc.transactional.newFriendRequest.useMutation();

  const { mutate } = trpc.friendships.sendFriendRequest.useMutation({
    onMutate: (mutationData) => {
      setSent(true);
      const prev = ctx.friendships.getFriends.getData();

      if (!data) return { prev };

      const prevSource = {
        ...data,
        email: data?.email || "",
        name: data?.name || "",
        image: data?.image || "",
        /** Purposely set to 0 because we don't need it */
        credits: 0,
      };

      ctx.friendships.getFriends.setData(undefined, {
        viewer: prev?.viewer ?? {
          ...data,
          username: data?.username || "",
          emailVerified: new Date(),
        },
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
      notify({
        sourceId: data?.id || "",
        targetId: friend.id,
        sourceUsername: data?.username || "",
        targetUsername: friend.username || "no-username",
        targetEmail: friend.email || "",
      });
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
    <div className="flex flex-col gap-4 rounded-lg border bg-gradient-to-t from-popover p-4 text-sm md:flex-row">
      {friend.image && (
        <div>
          <Image
            src={friend.image}
            width={100}
            height={100}
            alt="avatar"
            className="rounded-lg"
          />
        </div>
      )}

      <article className={cn("flex w-full flex-col gap-2")}>
        <div className="flex max-h-6 items-center">
          <h3 className="grow text-muted-foreground">
            {friend.username || "No username 😭"}
          </h3>

          {friend.id !== data?.id ? (
            <Button
              variant="outline"
              size={"sm"}
              rounding={"full"}
              className={cn(disableMutation && "pointer-events-none", "text-xs")}
              onClick={() => {
                data &&
                  !disableMutation &&
                  mutate({
                    sourceId: data.id,
                    userId: friend.id,
                  });
              }}
            >
              {alreadyFriends ? (
                <>
                  <CheckCircle size={16} className="text-green-500" />

                  <span className="hidden sm:block">Already friends!</span>
                </>
              ) : sent || requestPending ? (
                <>
                  <Clock size={16} className="text-yellow-500" />
                  <p className="hidden text-yellow-500 sm:block">Waiting...</p>
                </>
              ) : (
                <>
                  <Plus size={16} className="text-blue-500" />
                  <span className="hidden sm:block">Add friend</span>
                </>
              )}
            </Button>
          ) : (
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              You
            </span>
          )}

          {(requestPending || sent) && !alreadyFriends && data?.id !== friend.id && (
            <Button
              variant={"outline"}
              rounding={"full"}
              size={"sm"}
              className="ml-2 text-xs text-destructive"
              onClick={() => {
                cancel({
                  sourceId: data.id,
                  userId: friend.id,
                });
              }}
            >
              <X size={16} className="text-destructive" /> Cancel
            </Button>
          )}
        </div>

        <h3 className="capitalize">{friend.name}</h3>

        <p className="text-indigo-400">{friend.email}</p>
      </article>
    </div>
  );
};
