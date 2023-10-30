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
    <article className="flex flex-col gap-5 overflow-hidden rounded-2xl border text-center text-sm">
      <header className="flex justify-between border-b px-4 py-3">
        <span className="flex items-center gap-1 text-indigo-500">
          {secret.creator.username}
        </span>

        <span className="text-muted-foreground">
          {formatDistance(secret.createdAt || new Date(), new Date(), {
            addSuffix: true,
          })}
        </span>
      </header>

      <div className="flex flex-col gap-2 px-4">
        <h3 className="text-lg font-semibold uppercase">{secret.title}</h3>

        <p className="break-words text-muted-foreground">
          {secret.content.slice(0, 200)}...
        </p>
      </div>

      <div
        className={cn(
          "border-t bg-black py-4 font-semibold text-neutral-100 dark:bg-background",
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
          <span>
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
