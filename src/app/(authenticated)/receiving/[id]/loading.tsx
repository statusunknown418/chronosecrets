import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <main className="flex h-full items-center justify-center">
      <Spinner size="lg" />
    </main>
  );
}
