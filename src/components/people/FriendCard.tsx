import { FullUser } from "@/lib/db/schema";
import { cn } from "@/lib/utils";

export const FriendCard = ({
  friend,
  requestAccepted,
}: {
  friend: FullUser;
  requestAccepted: boolean;
}) => {
  return (
    <article
      className="flex flex-col gap-3 rounded-lg border p-3 text-sm"
      key={friend.id}
    >
      <div className="flex items-center justify-between">
        <p>{friend.email}</p>

        <p
          className={cn(
            "w-max rounded-full border px-3 py-1.5 text-xs",
            requestAccepted
              ? "border-indigo-500 text-indigo-500"
              : "border-dashed border-yellow-700 text-yellow-600",
          )}
        >
          {requestAccepted ? "Accepted" : "Pending"}
        </p>
      </div>

      <p className={cn(friend.username ? "text-indigo-500" : "text-muted-foreground")}>
        {friend.username || "no username, please tell them to setup their account"}
      </p>
    </article>
  );
};
