import { scheduleNotificationForReceiver } from "@/lib/api/transactional/mutations";
import { defer } from "@defer/client";

export default defer(scheduleNotificationForReceiver);
