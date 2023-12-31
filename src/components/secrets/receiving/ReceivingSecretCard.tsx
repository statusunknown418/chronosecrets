import { Scrambler } from "@/components/home/Scrambler";
import { SecretsByReceiverResponse } from "@/lib/api/secrets/queries";
import { formatDistance } from "date-fns";
import Image from "next/image";
import { Countdown } from "./Countdown";

export const ReceivingSecretCard = ({
  secret,
}: {
  secret: SecretsByReceiverResponse["mine"][number]["secret"];
}) => {
  return (
    <article className="flex min-h-full flex-col justify-between rounded-2xl border bg-gradient-to-br from-popover text-center text-sm">
      <header className="flex justify-between rounded-t-2xl border-b px-4 py-3 text-neutral-100 dark:text-muted-foreground">
        <p className="flex items-center gap-2">
          {secret.creator.image && (
            <Image
              src={secret.creator.image}
              width={20}
              height={20}
              alt="avatar"
              className="rounded-full"
            />
          )}
          <span className="text-foreground">{secret.creator.username}</span>
        </p>

        <span>
          {formatDistance(secret.createdAt || new Date(), new Date(), {
            addSuffix: true,
          })}
        </span>
      </header>

      <div className="flex min-h-[140px] flex-col gap-3 p-5">
        <h3 className="font-semibold uppercase">{secret.title}</h3>

        <Scrambler text={secret.content.slice(0, 100)} />
      </div>

      <Countdown secret={secret} />
    </article>
  );
};
