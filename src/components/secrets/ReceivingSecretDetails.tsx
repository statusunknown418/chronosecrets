import { Attachment, Secret } from "@/lib/db/schema";
import { format, formatDistance } from "date-fns";
import { Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export const SecretAvailable = ({
  secret,
}: {
  secret: Secret & { attachments: Attachment[] };
}) => {
  if (!secret) return;

  return (
    <section className="flex flex-col gap-4 px-3">
      <span className="w-max rounded-full border border-indigo-600 bg-indigo-950 px-3 py-1 text-xs font-light text-indigo-400">
        Encryption via {secret.encryptionType}
      </span>

      <p className="rounded-lg border border-dashed p-4 text-sm font-light tracking-wide text-muted-foreground">
        {secret.content}
      </p>

      <div className="flex items-center gap-1 text-sm font-light text-muted-foreground">
        {secret.wasEdited && <p className="italic text-foreground">Edited</p>}
        <p>-</p>
        <p>{format(secret.createdAt || new Date(), "PPpp")}</p>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <Info size={16} className="text-blue-500" />
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
      <div className="rounded-lg border border-yellow-700 bg-yellow-950/70 p-4">
        <h3>Hmm, this secret has not been revealed yet!</h3>
      </div>

      <p className="text-muted-foreground">
        It&apos;ll be available{" "}
        {formatDistance(secret.revealingDate, new Date(), { addSuffix: true })}
      </p>
    </section>
  );
};
