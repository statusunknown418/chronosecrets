import { getSecretsByReceiver } from "@/lib/api/secrets/queries";
import { EmptyInboxState } from "../secrets-list";
import { ReceivingSecretCard } from "./ReceivingSecretCard";

export const ReceivingList = async () => {
  const { mine } = await getSecretsByReceiver();

  if (!mine || mine.length === 0) {
    return <EmptyInboxState />;
  }

  const sorted = mine.sort((a, b) => {
    if (a.secret.revealingDate < b.secret.revealingDate) {
      return 1;
    }

    if (a.secret.revealingDate > b.secret.revealingDate) {
      return -1;
    }

    return 0;
  });

  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {sorted.map((s) => (
        <ReceivingSecretCard key={s.secretId} secret={s.secret} />
      ))}
    </section>
  );
};
