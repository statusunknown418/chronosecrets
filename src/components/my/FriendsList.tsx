"use client";
import { GetAllFriendshipsOutput } from "@/lib/api/friendships/queries";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ScrollArea } from "../ui/scroll-area";
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
    <ScrollArea className="relative max-h-56">
      <div
        className={cn(
          data.people.length > 1 &&
            "absolute bottom-0 left-0 z-10 h-10 w-full bg-gradient-to-t from-background",
        )}
      />

      <section
        className={cn("flex flex-col gap-4", data.people.length > 1 && "last:mb-5")}
        ref={parent}
      >
        {data.people.map((f) => (
          <FriendCard
            key={f.sourceId}
            /**
             * TODO: Probably improve queries and complexity later on, related to TOL-57
             */
            friend={data.viewer.id === f.sourceId ? f.friends : f.source}
            requestAccepted={f.requestAccepted}
          />
        ))}
      </section>
    </ScrollArea>
  );
}
