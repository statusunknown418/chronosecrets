import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingAllReceivingPage() {
  return (
    <div className="mt-4 flex h-full w-full flex-col gap-4">
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {[1, 2, 3].map((s) => (
          <Skeleton key={s} className="h-64 w-full" />
        ))}
      </section>
    </div>
  );
}
