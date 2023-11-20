import { FullUser } from "@/lib/db/schema";
import { Copy } from "lucide-react";
import { FindPeople } from "./FindPeople";

export const CompletedProfile = async ({ user }: { user: FullUser }) => {
  return (
    <section className="flex flex-col gap-4">
      <p className="flex items-center gap-1 text-sm text-muted-foreground">
        <span>Viewing as</span>
        <span className="text-foreground">{user?.username}</span>{" "}
        <span className="text-indigo-500">
          <Copy size={12} />
        </span>
      </p>

      <FindPeople />
    </section>
  );
};
