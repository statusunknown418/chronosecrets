import { SignOut } from "@/components/auth/SignOut";
import { SettingsForm } from "@/components/my/SettingsForm";
import { getFullUser } from "@/lib/auth/utils";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function MySettings() {
  const user = await getFullUser();

  if (!user) {
    redirect("/api/auth/signin");
  }

  return (
    <main className="flex h-full flex-col gap-4 p-4">
      <h1 className="text-xl font-bold">My Settings</h1>

      <Suspense>
        <SettingsForm user={user} />
      </Suspense>

      <SignOut />
    </main>
  );
}
