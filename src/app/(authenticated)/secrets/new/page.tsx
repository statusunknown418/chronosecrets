import { MainContent } from "@/components/layout/MainContent";
import SecretForm from "@/components/secrets/SecretForm";
import { BypassingBanner } from "@/components/secrets/edit/BypassingBanner";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export const metadata = {
  title: "New",
};

export default function NewSecretPage() {
  return (
    <MainContent>
      <Suspense
        fallback={
          <div className="flex flex-col gap-4">
            <Skeleton className="h-24 w-full" />
          </div>
        }
      >
        <BypassingBanner />
      </Suspense>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-5">
        <section className="col-span-3 max-w-3xl flex-grow">
          <Suspense>
            <SecretForm />
          </Suspense>
        </section>

        {/* TODO: Update this with some graphic
        <div className="sticky left-0 top-[80px] col-span-2 hidden h-72 w-full items-center justify-center rounded-lg border bg-popover p-5 text-muted-foreground lg:flex">
          Select an encryption type to visualize it
        </div> */}
      </div>
    </MainContent>
  );
}
