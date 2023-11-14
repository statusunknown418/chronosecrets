"use client";
import { RouterOutputs } from "@/lib/server/routers/_app";
import { trpc } from "@/lib/trpc/client";
import { useSearchParams } from "next/navigation";
import { SecretCard } from "../home/SecretCard";

export const ListWrapper = ({
  initialData,
}: {
  initialData: RouterOutputs["secrets"]["getSecrets"];
}) => {
  const query = useSearchParams().get("search");

  const { data } = trpc.secrets.getSecrets.useQuery(query || undefined, {
    initialData,
  });

  return (
    <section className="max-w-full pt-2">
      <ul className="grid h-full grid-cols-1 gap-4 md:grid-cols-2">
        {data.secrets.map((secret) => (
          <li key={secret.id}>
            <SecretCard secret={secret} />
          </li>
        ))}
      </ul>
    </section>
  );
};
