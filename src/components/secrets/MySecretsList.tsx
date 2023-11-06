import { getSecrets } from "@/lib/api/secrets/queries";
import { Secret } from "@/lib/db/schema";
import { Edit2, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export const MySecretsList = async ({ query }: { query?: string }) => {
  const { secrets } = await getSecrets(query);

  if (secrets.length === 0) {
    return <EmptySecretState />;
  }

  return (
    <section className="max-w-full">
      <ul className="flex h-full flex-col gap-4">
        {secrets.map((secret) => (
          <li key={secret.id}>
            <SecretCard secret={secret} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export const EmptySecretState = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 rounded-lg border p-4 text-sm text-slate-500">
      <p>You have no secrets yet.</p>

      <Link href="/secrets/new" className="focus-within:outline-none">
        <Button variant={"link"} icon={<Plus size={16} />}>
          <Plus size={16} />
          <span>Add secret</span>
        </Button>
      </Link>
    </div>
  );
};

const SecretCard = ({ secret }: { secret: Secret }) => {
  return (
    <article className="flex flex-col gap-2 rounded-lg border p-3 px-4 sm:p-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-medium">{secret.title}</h2>

        <Link href={`/secrets/${secret.id}`} passHref>
          <Button variant="ghost" size="icon">
            <Edit2 size={16} />
          </Button>
        </Link>
      </div>

      <p className="min-w-[28ch] max-w-full text-ellipsis break-words text-sm text-slate-500 sm:w-max">
        {secret.content.slice(0, 140)}...
      </p>
    </article>
  );
};
