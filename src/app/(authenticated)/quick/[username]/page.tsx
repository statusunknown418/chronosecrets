import { QuickFriendship } from "@/components/people/QuickFriendship";
import { Metadata } from "next";
import { Suspense } from "react";

type PageProps = {
  params: { username: string };
  searchParams: { sourceId: string };
};

export const generateMetadata = (props: PageProps): Metadata => {
  const decoded = decodeURIComponent(props.params.username);

  return {
    title: `Add ${decoded}`,
  };
};

export default function AutoAddFriend({
  params: { username },
  searchParams: { sourceId },
}: PageProps) {
  const source = decodeURIComponent(username);
  const id = decodeURIComponent(sourceId);

  return (
    <main className="flex h-full flex-col items-start justify-center p-2">
      <section className="flex flex-col gap-5 self-center rounded-xl border bg-popover p-5 shadow-xl shadow-black">
        <h1 className="text-2xl font-bold">Quick friendship</h1>

        <p className="font-light text-muted-foreground">
          <span className="text-foreground">{source}</span> wants to be friends with you!
        </p>

        <Suspense>
          <QuickFriendship sourceId={id} />
        </Suspense>
      </section>
    </main>
  );
}
