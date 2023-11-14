import { Button } from "@/components/ui/button";
import { Secret } from "@/lib/db/schema";
import { formatDistance } from "date-fns";
import { View } from "lucide-react";
import Link from "next/link";

export const SentSecretCard = ({ secret }: { secret: Secret }) => {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-dashed bg-popover p-4 sm:p-4">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-medium">{secret.title}</h2>

        <Link href={secret.shareableUrl}>
          <Button variant="ghost" size="icon">
            <View size={20} className="text-muted-foreground" />
          </Button>
        </Link>
      </header>

      <p className="min-w-[26ch] max-w-full text-ellipsis break-words text-sm font-light text-muted-foreground sm:w-max">
        {secret.content.slice(0, 140)}...
      </p>

      <div className="flex items-center gap-4">
        <p className="inline-flex items-center gap-2 text-xs">
          {secret.viewed && secret.viewedAt && (
            <span>{formatDistance(secret.viewedAt, new Date())}</span>
          )}
        </p>
      </div>
    </article>
  );
};
