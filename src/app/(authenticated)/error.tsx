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

      <p className="font-mono text-sm text-muted-foreground">
        {error.message} {error.digest && `(${error.digest})`}
      </p>

      <Button rounding="full" onClick={() => reset()}>
        Try again?
      </Button>
    </div>
  );
}
