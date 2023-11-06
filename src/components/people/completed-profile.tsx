import { FullUser } from "@/lib/db/schema";
import { FindPeople } from "./FindPeople";

export const CompletedProfile = async ({ user }: { user: FullUser }) => {
  return (
    <section className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Your username <strong>{user?.username}</strong>
      </p>

      <FindPeople />
    </section>
  );
};
