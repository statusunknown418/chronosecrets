import { Secret } from "@/lib/db/schema";
import { format } from "date-fns";
import { Edit, Eye } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export const SecretCard = ({ secret }: { secret: Secret }) => {
  return (
    <article className="flex min-h-[172px] flex-col gap-3 rounded-xl border bg-gradient-to-r from-popover p-4 sm:p-4">
      <Badge className="w-max">{secret.encryptionType}</Badge>
      <div className="flex max-h-8 items-center justify-between gap-2">
        <h2 className="text-lg font-medium">{secret.title}</h2>

        <Link href={`/secrets/${secret.id}`}>
          <Button variant="ghost" size="icon" disabled={!!secret.revealed}>
            <Edit size={16} className="text-muted-foreground" />
          </Button>
        </Link>
      </div>

      <p className="min-w-[26ch] max-w-full text-ellipsis break-words text-sm font-light text-muted-foreground sm:w-max">
        {secret.content.slice(0, 140)}...
      </p>

      <p className="inline-flex items-center gap-1 text-xs">
        <Eye size={15} />
        <span>{format(secret.revealingDate, "PPp")}</span>
      </p>
    </article>
  );
};
