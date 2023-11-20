import { Attachment, Secret } from "@/lib/db/schema";
import { format, formatDistance } from "date-fns";
import { Clock2Icon, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { ShowFullContent } from "./ShowFullContent";

export const SecretAvailable = ({
  secret,
}: {
  secret: Secret & { attachments: Attachment[] };
}) => {
  if (!secret) return notFound();

  return (
    <section className="flex flex-col gap-4 px-3">
      <span className="w-max rounded-full border border-indigo-600 bg-indigo-950 px-3 py-1 text-xs font-light text-indigo-400">
        Encrypted via {secret.encryptionType}
      </span>

      <ShowFullContent secret={secret} />

      <div className="flex items-center gap-1 text-sm font-light text-muted-foreground">
        {secret.wasEdited && (
          <>
            <p className="italic text-foreground">Edited</p>
            <span>-</span>
          </>
        )}

        <p>{format(secret.createdAt || new Date(), "PPpp")}</p>

        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <Info size={15} className="text-muted-foreground" />
            </TooltipTrigger>

            <TooltipContent>The time this secret was created</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <h3 className="border-b pb-2 text-lg font-semibold">Attachments</h3>

      {secret.attachments.length === 0 ? (
        <span className="text-sm text-muted-foreground">
          No attachments bound to this secret! 🤫
        </span>
      ) : (
        secret.attachments.map((a) => (
          <article key={a.id} className="flex items-center gap-2">
            <Link href={a.url}>
              <Image
                src={a.url}
                width={200}
                height={200}
                alt={`attachment-${a.url}`}
                className="h-auto w-auto rounded-lg transition-all hover:opacity-80"
                priority
              />
            </Link>
          </article>
        ))
      )}
    </section>
  );
};

export const SecretIsNotRevealedYet = ({ secret }: { secret: Secret }) => {
  return (
    <section className="flex flex-col gap-4 px-4">
      <article className="flex justify-between rounded-lg border border-yellow-800 bg-yellow-950/50 p-4 text-sm text-yellow-600">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold">Hmm, this secret has not been revealed yet!</h3>
          <p>Gotta wait a bit more</p>
        </div>

        <Clock2Icon className="animate-pulse" />
      </article>

      <p className="text-muted-foreground">
        It&apos;ll be available{" "}
        <span className="text-foreground">
          {formatDistance(secret.revealingDate, new Date(), { addSuffix: true })}
        </span>
      </p>
    </section>
  );
};
