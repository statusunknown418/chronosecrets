import { getAllFriendships } from "@/lib/api/friendships/queries";
import { FullUser } from "@/lib/db/schema";
import { Suspense } from "react";
import { Spinner } from "../ui/spinner";
import { FindPeople } from "./FindPeople";
import { FriendsList } from "./FriendsList";
import { RequestsForUser } from "./requests-for-user";

export const CompletedProfile = async ({ user }: { user: FullUser }) => {
  const friends = await getAllFriendships();

  return (
    <section className="flex flex-col gap-4">
      <p className="text-sm">
        Your username <strong>{user?.username}</strong>
      </p>

      <FindPeople />

      <h2 className="font-bold">Your friends</h2>

      <Suspense>
        <FriendsList friendships={friends} />
      </Suspense>

      <h2 className="font-bold">Your requests</h2>
      <Suspense fallback={<Spinner />}>
        <RequestsForUser />
      </Suspense>
    </section>
  );
};
