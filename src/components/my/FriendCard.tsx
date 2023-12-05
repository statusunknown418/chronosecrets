import { FullUser } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import Image from "next/image";

export const FriendCard = ({
  friend,
  requestAccepted,
}: {
  friend: FullUser;
  requestAccepted: boolean;
}) => {
  return (
    <article
      className={cn(
        "flex gap-4 rounded-lg border bg-popover bg-gradient-to-b from-popover p-4 text-sm",
        requestAccepted ? "items-center" : "items-start",
      )}
      key={friend.id}
    >
      {friend.image && (
        <Image
          src={friend.image}
          width={60}
          height={60}
          alt="avatar"
          className="rounded-lg"
        />
      )}

      <div className="flex w-full flex-col gap-1 lg:flex-row-reverse lg:justify-between">
        {!requestAccepted ? (
          <div
            className={cn(
              "flex h-max w-max items-center gap-2 rounded-full border px-3 py-1 text-xs",
              "border-dashed border-yellow-700 text-yellow-600",
            )}
          >
            <Clock size={15} />
            <span>Pending</span>
          </div>
        ) : (
          <div className="hidden lg:block" />
        )}

        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground">{friend.email}</p>

          <p className="font-semibold">{friend.name}</p>

          <p
            className={cn(friend.username ? "text-indigo-400" : "text-muted-foreground")}
          >
            {friend.username || "no username, please tell them to setup their account"}
          </p>
        </div>
      </div>
    </article>
  );
};
