"use client";

import { Button } from "@/components/ui/button";
import { Secret } from "@/lib/db/schema";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const ShowFullContent = ({ secret }: { secret: Secret }) => {
  const [show, update] = useState(false);

  const view = trpc.secrets.viewSecretAsReceiver.useMutation({
    onMutate: () => update(true),
  });

  return (
    <section className="relative">
      <p
        className={cn(
          "min-h-[156px] rounded-lg border border-dashed p-4 text-sm font-light tracking-wide transition-all duration-300",
          !secret.viewed && !show ? "blur" : "blur-none",
        )}
      >
        {secret.content}
      </p>

      {!secret.viewed && !show && (
        <Button
          rounding="full"
          variant="outline"
          className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform"
          onClick={() => view.mutate({ id: secret.id })}
        >
          Reveal now!
        </Button>
      )}
    </section>
  );
};
