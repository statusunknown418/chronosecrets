import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getSecretByIdForReceiver } from "@/lib/api/secrets/queries";
import { Attachment, Secret } from "@/lib/db/schema";
import { TRPCError } from "@trpc/server";
import { format, formatDistance } from "date-fns";
import { AlertOctagon, Info, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function ReceiveSecretByIdPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { secret, error } = await getSecretByIdForReceiver(Number(id));

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <main className="flex flex-col gap-4">
      <section className="sticky inset-0 z-10 flex flex-col gap-2 border-b bg-background/20 px-4 py-2 backdrop-blur backdrop-filter">
        <header className="flex w-full items-center justify-between gap-4">
          <h1 className="flex items-center gap-3 text-2xl font-bold capitalize tracking-tight">
            <span>{secret.title}</span>
          </h1>

          <Link href="/receiving" className="focus-within:outline-none">
            <Button variant="ghost" size="icon">
              <X size={20} className="text-muted-foreground" />
            </Button>
          </Link>
        </header>
      </section>

      <p className="flex items-center gap-1 px-4 text-sm">
        <span>By {secret.creator.username}</span>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <Info size={16} className="text-blue-500" />
            </TooltipTrigger>

            <TooltipContent>{secret.creator.name}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </p>

      {secret.revealed ? (
        <SecretAvailable secret={secret} />
      ) : (
        <SecretIsNotRevealedYet secret={secret} />
      )}
    </main>
  );
}

const ErrorState = ({ error }: { error: TRPCError }) => {
  return (
    <main className="m-4 flex flex-col items-center justify-center gap-4 rounded-lg border p-4">
      <AlertOctagon className="text-destructive" />
      <h1 className="flex items-center gap-2 text-4xl font-light">
        <span>Oops</span>
      </h1>

      <p>{error.message}</p>

      <p className="text-center text-sm text-muted-foreground">
        This is likely an error on our side, please reach out!
      </p>
    </main>
  );
};

const SecretAvailable = ({
  secret,
}: {
  secret: Secret & { attachments: Attachment[] };
}) => {
  if (!secret) return;

  return (
    <section className="flex flex-col gap-4 px-3">
      <p className="rounded-lg border border-dashed p-4 text-sm font-light text-muted-foreground">
        {secret.content}
      </p>

      <p className="flex items-center gap-1 text-sm font-light text-muted-foreground">
        {secret.wasEdited && <span className="underline underline-offset-2">Edited</span>}
        <span>-</span>
        <span>{format(secret.createdAt || new Date(), "PPpp")}</span>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <Info size={16} className="text-blue-500" />
            </TooltipTrigger>

            <TooltipContent>The time this secret was created</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </p>

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

const SecretIsNotRevealedYet = ({ secret }: { secret: Secret }) => {
  return (
    <section className="flex flex-col gap-4 px-4">
      <h3>Hmm, this secret has not been revealed yet!</h3>

      <p className="text-muted-foreground">
        It&apos;ll be available{" "}
        {formatDistance(secret.revealingDate, new Date(), { addSuffix: true })}
      </p>
    </section>
  );
};
