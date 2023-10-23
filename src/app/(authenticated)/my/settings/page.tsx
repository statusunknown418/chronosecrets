import { SignOut } from "@/components/auth/SignOut";
import HydrateSettingsForm from "@/components/my/HydrateSettingsForm";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

export default async function MySettings() {
  return (
    <main className="flex h-full flex-col gap-4">
      <h1 className="border-b px-4 py-3 text-2xl font-bold">My Settings</h1>

      <section className="flex flex-col gap-4 px-4">
        <Suspense
          fallback={
            <div className="flex h-full items-center justify-center">
              <Spinner />
            </div>
          }
        >
          <HydrateSettingsForm />
        </Suspense>

        <SignOut />
      </section>
    </main>
  );
}
