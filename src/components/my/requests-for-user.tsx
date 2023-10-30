import { getPendingRequestsForViewer } from "@/lib/api/user/queries";
import { Suspense } from "react";
import { RequestsList } from "../people/RequestsList";

export const RequestsForUser = async () => {
  const requests = await getPendingRequestsForViewer();

  return (
    <section className="flex flex-col gap-4">
      <Suspense>
        <RequestsList requests={requests} />
      </Suspense>
    </section>
  );
};
