"use client";

import { Button } from "@/components/ui/button";
import { Secret } from "@/lib/db/schema";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useScramble } from "use-scramble";

export const ShowFullContent = ({ secret }: { secret: Secret }) => {
  const [show, update] = useState(false);
  const { ref, replay } = useScramble({
    speed: 0.6,
    overdrive: false,
    text: secret.content,
  });

  const view = trpc.secrets.viewSecretAsReceiver.useMutation({
    onMutate: () => update(true),
  });

  return (
    <section className="relative">
      <p
        className={cn(
          "h-max min-h-[200px] rounded-lg border border-dashed bg-popover p-4 text-sm font-light tracking-wide shadow-lg transition-all duration-200",
          !secret.viewed && !show ? "blur" : "blur-none",
        )}
        ref={ref}
      >
        {secret.content}
      </p>

      {!secret.viewed && !show && (
        <Button
          rounding="full"
          variant="outline"
          className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform"
          onClick={() => {
            view.mutate({ id: secret.id });
            replay();
          }}
        >
          Reveal now!
        </Button>
      )}
    </section>
  );
};
