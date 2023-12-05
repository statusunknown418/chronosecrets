import { ReceivingList } from "@/components/secrets/receiving/receiving-list";
import { Skeleton } from "@/components/ui/skeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sent to Me",
};

export default function ReceivingSecretsPage() {
  return (
    <div className="flex flex-col gap-4">
      <section className="h-full w-full pb-16">
        <Suspense
          fallback={
            <section className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2">
              {[1, 2, 3, 4, 5, 6].map((s) => (
                <Skeleton key={s} className="h-64 w-full" />
              ))}
            </section>
          }
        >
          <ReceivingList />
        </Suspense>
      </section>
    </div>
  );
}
