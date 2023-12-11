import { MainContent } from "@/components/layout/MainContent";
import { AcceptRequest } from "@/components/people/AcceptRequest";
import { Button } from "@/components/ui/button";
import { getSafeUserById } from "@/lib/api/user/queries";
import Image from "next/image";
import Link from "next/link";

export default async function QuickRequest({ params }: { params: { slug: string[] } }) {
  const [sourceId, targetId] = params.slug;

  const target = await getSafeUserById(targetId);

  return (
    <MainContent className="grid h-full grid-cols-1 place-items-center">
      <section className="flex flex-col gap-6 rounded-xl border bg-popover p-4 sm:p-6">
        <h1 className="text-2xl font-bold">
          Friend request from <span className="text-indigo-400">{target?.username}</span>
        </h1>

        <section className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {target?.image && (
            <Image
              src={target.image}
              alt={target.email}
              width={80}
              height={80}
              className="rounded-full"
            />
          )}

          <div className="flex flex-col gap-2 sm:gap-4">
            <p className="text-sm text-muted-foreground">
              You can accept it just by clicking the button below, or you can also ignore
              it.
            </p>

            <div className="flex items-center justify-between gap-2 sm:justify-start">
              <AcceptRequest sourceId={sourceId} targetId={targetId} />

              <Link href="/home" passHref>
                <Button variant={"ghost"}>Not now, thanks</Button>
              </Link>
            </div>
          </div>
        </section>
      </section>
    </MainContent>
  );
}
