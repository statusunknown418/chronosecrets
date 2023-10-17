import { getAllFriendships } from "@/lib/api/friendships/queries";
import { FullUser } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

export async function FindFriends({ user }: { user: FullUser }) {
  const friends = await getAllFriendships();

  return (
    <section className="flex flex-col gap-4">
      <p className="text-sm">
        Your username <strong>{user?.username}</strong>
      </p>

      <p className="text-sm">
        Or easier, here&apos;s a shareable customized URL {user.id}
      </p>

      <Input placeholder="@someone or some@friend.com" />

      <h2 className="font-bold">Your friends</h2>

      {friends.map((friend) => (
        <article
          className="flex flex-col gap-3 rounded-lg border p-3 text-sm"
          key={friend.friendId}
        >
          <div className="flex items-center justify-between">
            <p>{friend.friends.email}</p>

            <p
              className={cn(
                "w-max rounded-full border px-3 py-1.5 text-xs",
                friend.requestAccepted
                  ? "border-indigo-500 text-indigo-500"
                  : "border-dashed border-yellow-700 text-yellow-600",
              )}
            >
              {friend.requestAccepted ? "Accepted" : "Pending"}
            </p>
          </div>

          <p
            className={cn(
              friend.friends.username ? "text-indigo-500" : "text-muted-foreground",
            )}
          >
            {friend.friends.username ||
              "no username, please tell them to setup their account"}
          </p>
        </article>
      ))}
    </section>
  );
}
