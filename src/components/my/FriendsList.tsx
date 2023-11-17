"use client";
import { GetAllFriendshipsOutput } from "@/lib/api/friendships/queries";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FriendCard } from "./FriendCard";

export function FriendsList({ friendships }: { friendships: GetAllFriendshipsOutput }) {
  const [parent] = useAutoAnimate();
  const { data } = trpc.friendships.getFriends.useQuery(undefined, {
    initialData: friendships,
  });

  if (data.people.length === 0) {
    return (
      <div className="flex min-h-[120px] items-center justify-center rounded-lg border text-sm text-muted-foreground">
        <p className="text-center">
          You haven&apos;t added anyone yet, try searching and sending requests!.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <article
        className={cn("flex max-h-64 flex-col gap-4 overflow-y-scroll")}
        ref={parent}
      >
        {data.people.map((f) => (
          <FriendCard
            key={data.viewer.id === f.sourceId ? f.userId : f.sourceId}
            /**
             * TODO: Probably improve queries and complexity later on, related to TOL-57
             */
            friend={data.viewer.id === f.sourceId ? f.friends : f.source}
            requestAccepted={f.requestAccepted}
          />
        ))}
      </article>

      {data.people?.length > 2 && (
        <div className="-bottom- absolute left-0 z-10 flex h-3 w-full flex-col items-center justify-center bg-black/70 blur" />
      )}
    </div>
  );
}
