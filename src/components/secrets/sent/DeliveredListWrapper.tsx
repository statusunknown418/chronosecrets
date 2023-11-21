"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { RouterOutputs } from "@/lib/server/routers/_app";
import { trpc } from "@/lib/trpc/client";
import { Info, Plus } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SentSecretCard } from "./SentSecretCard";

export const DeliveredListWrapper = ({
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
      <section className="flex max-w-full flex-col gap-5">
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
      <section className="flex flex-col gap-5">
        <Alert variant="warning">
          <Info size={16} />
          <AlertTitle>Note</AlertTitle>
          <AlertDescription>These secrets have already been revealed!</AlertDescription>
        </Alert>

        <div className="flex h-full flex-col items-center justify-center gap-2 rounded-lg border p-4 text-sm text-slate-500">
          <p>You have no secrets yet.</p>

          <Link href="/secrets/new" className="focus-within:outline-none">
            <Button variant={"link"}>
              <Plus size={16} />
              <span>Add secret</span>
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="flex max-w-full flex-col gap-5">
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
