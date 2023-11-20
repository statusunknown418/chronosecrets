"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { RouterOutputs } from "@/lib/server/routers/_app";
import { trpc } from "@/lib/trpc/client";
import { Info } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SentSecretCard } from "./SentSecretCard";

export const RevealingListWrapper = ({
  initialData,
}: {
  initialData?: RouterOutputs["secrets"]["getRevealedSecrets"];
}) => {
  const query = useSearchParams().get("search");

  const { data, isLoading } = trpc.secrets.getRevealedSecrets.useQuery(
    query || undefined,
    {
      initialData,
    },
  );

  if (isLoading) {
    return (
      <section className="flex max-w-full flex-col gap-5 pt-2">
        <Alert variant="warning">
          <Info size={16} />
          <AlertTitle>Note</AlertTitle>
          <AlertDescription>These secrets have already been revealed!</AlertDescription>
        </Alert>

        <ul className="grid h-full grid-cols-1 gap-4 md:grid-cols-2">
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <Skeleton key={s} className="h-64 w-full" />
          ))}
        </ul>
      </section>
    );
  }

  if (data?.secrets.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center gap-5 rounded-xl border p-4">
        <Info size={32} className="text-gray-500" />
        <p className="text-center text-gray-500">No secrets yet</p>
        <Link href="/secrets/new">
          <Button variant="link">Create one!</Button>
        </Link>
      </section>
    );
  }

  return (
    <section className="flex max-w-full flex-col gap-5 pt-2">
      <Alert variant="warning">
        <Info size={16} />
        <AlertTitle>Note</AlertTitle>
        <AlertDescription>These secrets have already been revealed!</AlertDescription>
      </Alert>

      <ul className="grid h-full grid-cols-1 gap-4 md:grid-cols-2">
        {data?.secrets.map((secret) => (
          <li key={secret.id}>
            <SentSecretCard secret={secret} />
          </li>
        ))}
      </ul>
    </section>
  );
};
