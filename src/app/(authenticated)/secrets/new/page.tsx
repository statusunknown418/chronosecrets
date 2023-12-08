import { MainContent } from "@/components/layout/MainContent";
import SecretForm from "@/components/secrets/SecretForm";
import { BypassingBanner } from "@/components/secrets/edit/BypassingBanner";
import { Suspense } from "react";

export const metadata = {
  title: "New",
};

export default function NewSecretPage() {
  return (
    <MainContent>
      <Suspense>
        <BypassingBanner />
      </Suspense>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-5">
        <section className="col-span-3 max-w-3xl flex-grow">
          <Suspense>
            <SecretForm />
          </Suspense>
        </section>

        <div className="sticky left-0 top-[80px] col-span-2 hidden h-72 w-full items-center justify-center rounded-lg border bg-popover text-muted-foreground lg:flex">
          Select an encryption type to visualize it
        </div>
      </div>
    </MainContent>
  );
}
