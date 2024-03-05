import { db } from "@/lib/db";
import { sessions } from "@/lib/db/schema";
import { defer } from "@defer/client";

export const wakeDatabase = async () => {
  await db.insert(sessions).values({
    expires: new Date(),
    sessionToken: "UNUSED",
    userId: "UNUSED",
  });

  return {
    success: true,
    message: "Database shouldn't die yet",
  };
};

export default defer.cron(wakeDatabase, "0 0 * * * 1,4");
