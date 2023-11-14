import { ReceivingList } from "@/components/secrets/receiving/receiving-list";
import { Spinner } from "@/components/ui/spinner";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sent to Me",
};

export default function ReceivingSecretsPage() {
  return (
    <section className="h-full w-full">
      <Suspense
        fallback={
          <div className="flex h-full flex-col items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <ReceivingList />
      </Suspense>
    </section>
  );
}
