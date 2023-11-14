"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RouterOutputs } from "@/lib/server/routers/_app";
import { trpc } from "@/lib/trpc/client";
import { Info } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { SentSecretCard } from "./SentSecretCard";

export const RevealingListWrapper = ({
  initialData,
}: {
  initialData: RouterOutputs["secrets"]["getRevealedSecrets"];
}) => {
  const query = useSearchParams().get("search");

  const { data } = trpc.secrets.getRevealedSecrets.useQuery(query || undefined, {
    initialData,
  });

  return (
    <section className="flex max-w-full flex-col gap-5 pt-2">
      <Alert variant="warning">
        <Info size={16} />
        <AlertTitle>Note</AlertTitle>
        <AlertDescription>These secrets have already been revealed!</AlertDescription>
      </Alert>

      <ul className="grid h-full grid-cols-1 gap-4 md:grid-cols-2">
        {data.secrets.map((secret) => (
          <li key={secret.id}>
            <SentSecretCard secret={secret} />
          </li>
        ))}
      </ul>
    </section>
  );
};
