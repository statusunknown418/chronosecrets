"use client";
import { GetAllFriendshipsOutput } from "@/lib/api/friendships/queries";
import { trpc } from "@/lib/trpc/client";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FriendCard } from "./FriendCard";

export function FriendsList({ friendships }: { friendships: GetAllFriendshipsOutput }) {
  const [parent] = useAutoAnimate();
  const { data } = trpc.friendships.getFriends.useQuery(undefined, {
    initialData: friendships,
  });

  return (
    <section className="flex flex-col gap-4" ref={parent}>
      {data.map((f) => (
        <FriendCard
          key={f.sourceId}
          friend={f.friends}
          requestAccepted={f.requestAccepted}
        />
      ))}
    </section>
  );
}
