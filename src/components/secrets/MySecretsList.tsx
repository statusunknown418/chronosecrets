import { getSecrets } from "@/lib/api/secrets/queries";
import { Secret } from "@/lib/db/schema";
import { env } from "@/lib/env.mjs";
import cryptoJS from "crypto-js";
import { SecretModal } from "./SecretModal";

export const MySecretsList = async () => {
  const { secrets } = await getSecrets();

  if (secrets.length === 0) {
    return <EmptySecretState />;
  }

  return (
    <section>
      <ul className="flex flex-col gap-4">
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
      <SecretModal emptyState />
    </div>
  );
};

const SecretCard = ({ secret }: { secret: Secret }) => {
  const hashed = cryptoJS.AES.encrypt(secret.content, env.NEXTAUTH_SECRET!).toString();

  return (
    <article className="flex justify-between rounded-lg border p-3 sm:p-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-medium">{secret.title}</h2>
        <p className="max-w-[25ch] whitespace-pre-line break-words text-sm text-slate-500">
          {hashed}
        </p>
      </div>

      <SecretModal secret={secret} />
    </article>
  );
};
