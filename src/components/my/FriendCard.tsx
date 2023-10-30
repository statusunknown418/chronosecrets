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
        <p className="text-muted-foreground">{friend.email}</p>
        {!requestAccepted && (
          <p
            className={cn(
              "w-max rounded-full border px-3 py-1 text-xs",
              "border-dashed border-yellow-700 text-yellow-600",
            )}
          >
            Pending
          </p>
        )}
      </div>

      <p className="font-bold">{friend.name}</p>

      <p className={cn(friend.username ? "text-indigo-500" : "text-muted-foreground")}>
        {friend.username || "no username, please tell them to setup their account"}
      </p>
    </article>
  );
};
