import { PageHeader } from "@/components/layout/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingAllReceivingPage() {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <PageHeader title="Sent to me" back={true} />

      <section className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2">
        {[1, 2, 3].map((s) => (
          <Skeleton key={s} className="h-64 w-full" />
        ))}
      </section>
    </div>
  );
}
