import { TRPCError } from "@trpc/server";
import { AlertOctagon } from "lucide-react";

export const ErrorState = ({ error }: { error: TRPCError }) => {
  return (
    <main className="m-4 flex flex-col items-center justify-center gap-4 rounded-lg border p-4">
      <AlertOctagon className="text-destructive" />
      <h1 className="flex items-center gap-2 text-4xl font-light">
        <span>Oops</span>
      </h1>

      <p>{error.message}</p>

      <p className="text-center text-sm text-muted-foreground">
        {error.cause?.message ||
          "This is likely an error on our side, please reach out to us!"}
      </p>
    </main>
  );
};
