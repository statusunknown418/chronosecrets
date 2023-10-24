import { Spinner } from "@/components/ui/spinner";

export default function LoadingHome() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}
