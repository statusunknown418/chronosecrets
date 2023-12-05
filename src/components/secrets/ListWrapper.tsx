"use client";
import { RouterOutputs } from "@/lib/server/routers/_app";
import { trpc } from "@/lib/trpc/client";
import { useSearchParams } from "next/navigation";
import { SecretCard } from "../home/SecretCard";
import { Skeleton } from "../ui/skeleton";

export const ListWrapper = ({
  initialData,
}: {
  initialData?: RouterOutputs["secrets"]["getSecrets"];
}) => {
  const query = useSearchParams().get("search");

  const { data, isLoading } = trpc.secrets.getSecrets.useQuery(query || undefined, {
    initialData,
  });

  if (isLoading) {
    return (
      <section className="max-w-full">
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
      <section>
        <p className="text-center text-gray-500">No secrets found</p>
      </section>
    );
  }

  return (
    <ul className="grid h-full grid-cols-1 gap-4 md:grid-cols-2">
      {data?.secrets.map((secret) => (
        <li key={secret.id}>
          <SecretCard secret={secret} />
        </li>
      ))}
    </ul>
  );
};
