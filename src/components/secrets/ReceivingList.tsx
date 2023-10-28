import {
  SecretsByReceiverResponse,
  getSecretsByReceiver,
} from "@/lib/api/secrets/queries";
import { cn } from "@/lib/utils";
import { formatDistance } from "date-fns/esm";
import Link from "next/link";
import { EmptySecretState } from "./MySecretsList";

export const ReceivingList = async () => {
  const { mine } = await getSecretsByReceiver();

  if (mine.length === 0) {
    return <EmptySecretState />;
  }

  const sorted = mine.sort((a, b) => {
    if (a.secret.revealingDate < b.secret.revealingDate) {
      return -1;
    }

    if (a.secret.revealingDate > b.secret.revealingDate) {
      return 1;
    }

    return 0;
  });

  return (
    <section className="flex h-full flex-col gap-4 px-4">
      {sorted.map((s) => (
        <ReceivingSecretCard key={s.secretId} secret={s.secret} />
      ))}
    </section>
  );
};

const ReceivingSecretCard = ({
  secret,
}: {
  secret: SecretsByReceiverResponse["mine"][number]["secret"];
}) => {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border bg-muted/70 text-center text-sm">
      <header className="flex justify-between px-4 pt-4">
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

      <p
        className={cn(
          "rounded-2xl border-t bg-black py-4 font-semibold text-neutral-100 dark:bg-background",
        )}
      >
        {secret.revealed ? (
          <Link href={`/receiving/${secret.id}`}>
            <span>Available Now!</span>
          </Link>
        ) : (
          <span>
            Revealing{" "}
            {formatDistance(secret.revealingDate || new Date(), new Date(), {
              addSuffix: true,
            })}
          </span>
        )}
      </p>
    </article>
  );
};
