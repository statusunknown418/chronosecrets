import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-4 px-4">
      <span className="rounded-full border border-indigo-800 px-4 py-1 text-3xl font-light text-indigo-400">
        404
      </span>

      <h1 className="text-center text-2xl font-bold">
        Oh no, this page doesn&apos;t exist 💥
      </h1>

      <Link href={"/home"} passHref>
        <Button variant="link">Go back home</Button>
      </Link>
    </main>
  );
}
