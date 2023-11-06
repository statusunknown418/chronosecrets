import { SecretsByReceiverResponse } from "@/lib/api/secrets/queries";
import { cn } from "@/lib/utils";
import { formatDistance } from "date-fns";
import { Dot } from "lucide-react";
import Link from "next/link";

export const ReceivingSecretCard = ({
  secret,
}: {
  secret: SecretsByReceiverResponse["mine"][number]["secret"];
}) => {
  return (
    <article className="flex flex-col rounded-2xl border text-center text-sm">
      <header className="flex justify-between rounded-t-2xl border-b bg-neutral-800 px-4 py-2 text-neutral-100 dark:bg-muted dark:text-muted-foreground">
        <span className="flex items-center gap-1 text-indigo-500">
          {secret.creator.username}
        </span>

        <span>
          {formatDistance(secret.createdAt || new Date(), new Date(), {
            addSuffix: true,
          })}
        </span>
      </header>

      <div className="flex flex-col gap-2 bg-background px-4 py-5">
        <h3 className="font-semibold uppercase">{secret.title}</h3>

        <p className="break-words text-sm text-muted-foreground">
          {secret.content.slice(0, 200)}...
        </p>
      </div>

      <div
        className={cn(
          "rounded-b-2xl border-t bg-neutral-800 py-3 font-semibold text-neutral-100 dark:bg-muted",
        )}
      >
        {secret.revealed || secret.revealingDate < new Date() ? (
          <Link href={`/receiving/${secret.id}`}>
            <p className="flex items-center justify-center gap-1">
              <Dot size={24} className="animate-ping text-green-500" />
              <span>Available Now!</span>
            </p>
          </Link>
        ) : (
          <span className="text-muted-foreground">
            Revealing{" "}
            {formatDistance(secret.revealingDate || new Date(), new Date(), {
              addSuffix: true,
            })}
          </span>
        )}
      </div>
    </article>
  );
};
