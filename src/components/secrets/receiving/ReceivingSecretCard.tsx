import { SecretsByReceiverResponse } from "@/lib/api/secrets/queries";
import { formatDistance } from "date-fns";
import { Countdown } from "./Countdown";

export const ReceivingSecretCard = ({
  secret,
}: {
  secret: SecretsByReceiverResponse["mine"][number]["secret"];
}) => {
  return (
    <article className="flex flex-col rounded-2xl border text-center text-sm">
      <header className="flex justify-between rounded-t-2xl border-b bg-neutral-800 px-4 py-2 text-neutral-100 dark:bg-popover dark:text-muted-foreground">
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

      <Countdown secret={secret} />
    </article>
  );
};
