import { Spinner } from "@/components/ui/spinner";

export default function LoadingUserProfile() {
  return (
    <section className="flex h-full w-full items-center justify-center">
      <Spinner />
    </section>
  );
}
