import { AcceptRequest } from "@/components/people/AcceptRequest";
import { Button } from "@/components/ui/button";
import { getSafeUserById } from "@/lib/api/user/queries";
import Link from "next/link";

export default async function QuickRequest({ params }: { params: { slug: string[] } }) {
  const [sourceId, targetId] = params.slug;

  const target = await getSafeUserById(targetId);

  return (
    <main className="flex h-full w-full flex-col items-center justify-center gap-10 p-2 sm:p-5">
      <section className="flex flex-col gap-6 rounded-xl border bg-popover p-4 sm:p-6">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Friend request from <span className="text-indigo-500">{target?.username}</span>
        </h1>

        <p className="text-muted-foreground">
          You can accept it just by clicking the button below, or you can also ignore it.
        </p>

        <div className="flex items-center justify-between gap-2 sm:justify-start">
          <AcceptRequest sourceId={sourceId} targetId={targetId} />

          <Link href="/home" passHref>
            <Button variant={"ghost"}>Not now, thanks</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
