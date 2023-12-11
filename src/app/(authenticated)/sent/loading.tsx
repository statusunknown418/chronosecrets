import { Skeleton } from "@/components/ui/skeleton";

export default function HomePageLoader() {
  return (
    <section className="flex h-full flex-col gap-5">
      <div className="flex items-center justify-start">
        <Skeleton className="h-10 w-20 rounded-l-full" />
        <Skeleton className="h-10 w-20 rounded-r-full" />
      </div>

      <section className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
        {[1, 2, 3].map((s) => (
          <Skeleton key={s} className="h-64 w-full" />
        ))}
      </section>
    </section>
  );
}
