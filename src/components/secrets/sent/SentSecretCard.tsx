import { Scrambler } from "@/components/home/Scrambler";
import { Button } from "@/components/ui/button";
import { RouterOutputs } from "@/lib/server/routers/_app";
import { formatDistance } from "date-fns";
import { Eye, User2 } from "lucide-react";
import Link from "next/link";

export const SentSecretCard = ({
  secret,
}: {
  secret: RouterOutputs["secrets"]["getRevealedSecrets"]["secrets"][number];
}) => {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-dashed bg-gradient-to-l from-popover p-4">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-medium">{secret.title}</h2>

        <Link href={{ pathname: secret.shareableUrl, query: { wasEditing: true } }}>
          <Button variant="ghost" size="icon">
            <Eye size={20} className="text-muted-foreground" />
          </Button>
        </Link>
      </header>

      <Scrambler text={secret.content.slice(0, 200)} />

      <div className="flex items-center gap-4">
        {secret.viewed && secret.viewedAt && (
          <p className="inline-flex items-center gap-1 text-xs tracking-wide text-foreground">
            Seen {formatDistance(secret.viewedAt, new Date(), { addSuffix: true })}
          </p>
        )}
      </div>

      <footer className="flex items-center justify-between pb-2">
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <User2 size={15} />
          <span>Made for</span>
          <span className="text-indigo-400">
            {secret.receivers.map((r) => r.receiver.username)}
          </span>
        </p>
      </footer>
    </article>
  );
};
