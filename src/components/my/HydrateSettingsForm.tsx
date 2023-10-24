import { getFullUser } from "@/lib/auth/utils";
import { redirect } from "next/navigation";
import { SettingsForm } from "./SettingsForm";

export default async function HydrateSettingsForm() {
  const user = await getFullUser();

  if (!user) {
    redirect("/api/auth/signin");
  }

  return <SettingsForm user={user} />;
}
