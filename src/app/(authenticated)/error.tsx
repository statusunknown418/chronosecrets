"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-5">
      <h2 className="text-2xl font-bold">Congrats you broke the app! 🤯</h2>

      <p className="text-center">
        Send us the error code and message that is showed below and we&apos;ll make sure
        it gets fixed!
      </p>

      <p className="rounded-lg border p-4 font-mono text-sm text-muted-foreground">
        {error.message} {error.digest && `(${error.digest})`}
      </p>

      <Button rounding="full" onClick={() => reset()}>
        Try again?
      </Button>
    </div>
  );
}
