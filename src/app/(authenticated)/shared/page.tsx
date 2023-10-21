import { Button } from "@/components/ui/button";
import { Ban } from "lucide-react";
import Link from "next/link";

export default function SharedPage() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-4 rounded-lg p-4">
      <Ban size={32} className="text-indigo-400" />

      <h2 className="text-xl">
        Hmm, no <span className="font-bold">shareable url</span> detected
      </h2>

      <p className="text-center text-muted-foreground">
        Keep in mind that a secret&apos;s shareable url has the following format
      </p>
      <code className="rounded-lg border bg-gray-800 p-2">
        https://wait4it.app/shared/{"<id>"}
      </code>

      <Link href="/home" passHref>
        <Button>Go home</Button>
      </Link>
    </main>
  );
}
