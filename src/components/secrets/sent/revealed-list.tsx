import { getRevealedSecrets } from "@/lib/api/secrets/queries";
import { Suspense } from "react";
import { EmptySecretState } from "../secrets-list";
import { DeliveredListWrapper } from "./DeliveredListWrapper";

export const RevealedSecretsList = async () => {
  const data = await getRevealedSecrets();

  if (data.secrets.length === 0) {
    return <EmptySecretState />;
  }

  return (
    <Suspense>
      <DeliveredListWrapper initialData={data} />
    </Suspense>
  );
};
