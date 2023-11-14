import { getRevealedSecrets } from "@/lib/api/secrets/queries";
import { Suspense } from "react";
import { EmptySecretState } from "../MySecretsList";
import { RevealingListWrapper } from "./RevealingListWrapper";

export const RevealedSecretsList = async () => {
  const data = await getRevealedSecrets();

  if (data.secrets.length === 0) {
    return <EmptySecretState />;
  }

  return (
    <Suspense>
      <RevealingListWrapper initialData={data} />
    </Suspense>
  );
};
