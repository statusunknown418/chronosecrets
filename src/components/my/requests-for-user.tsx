import { getPendingRequestsForViewer } from "@/lib/api/user/queries";
import { RequestsList } from "../people/RequestsList";

export const RequestsForUser = async () => {
  const requests = await getPendingRequestsForViewer();

  return <RequestsList requests={requests} />;
};
