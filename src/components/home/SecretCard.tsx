import { useReceiverDataStore } from "@/lib/hooks/useReceiverDataStore";
import { RouterOutputs } from "@/lib/server/routers/_app";
import { format } from "date-fns";
import { Edit, Eye, User2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Scrambler } from "./Scrambler";

export const SecretCard = ({
  secret,
}: {
  secret: RouterOutputs["secrets"]["getSecrets"]["secrets"][number];
}) => {
  const syncReceiver = useReceiverDataStore((s) => s.setReceiverData);

  return (
    <article className="flex min-h-[172px] cursor-default flex-col gap-3 rounded-2xl border bg-gradient-to-br from-popover py-4 duration-200 hover:zoom-in-50 [&>*]:px-4">
      <div>
        <Badge className="w-max">{secret.encryptionType}</Badge>
      </div>

      <div className="flex max-h-8 items-center justify-between gap-2">
        <h2 className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-medium transition-all">
          {secret.title}
        </h2>

        <Link href={`/secrets/${secret.id}`}>
          <Button
            variant="ghost"
            size="icon"
            disabled={!!secret.revealed}
            onClick={() => syncReceiver(secret.receivers[0].receiver || null)}
          >
            <Edit size={16} className="text-muted-foreground" />
          </Button>
        </Link>
      </div>

      <Scrambler text={secret.content.slice(0, 200)} />

      <Separator />

      <div className="group flex flex-col gap-1.5">
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <User2 size={15} />
          <span>Made for </span>
          <span className="text-indigo-400">
            {secret.receivers.map((r) => r.receiver.username)}
          </span>
        </p>

        <p className="inline-flex items-center gap-1 text-xs text-muted-foreground duration-200 group-hover:text-foreground">
          <Eye size={15} />
          <span>{format(secret.revealingDate, "PPPp")}</span>
        </p>
      </div>
    </article>
  );
};
