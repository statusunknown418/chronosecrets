import { MainContent } from "@/components/layout/MainContent";
import { QuickFriendship } from "@/components/people/QuickFriendship";
import { Metadata } from "next";
import { Suspense } from "react";
import { QuickUserImage } from "../QuickUserImage";

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
    <MainContent className="h-full justify-center px-4">
      <section className="flex flex-col gap-5 self-center rounded-xl border bg-popover p-5 shadow-xl shadow-black">
        <h1 className="text-2xl font-bold">Quick friendship</h1>

        <div className="flex items-center gap-2">
          <QuickUserImage />

          <p className="text-sm font-light text-muted-foreground">
            <span className="text-foreground">{source}</span> wants to be friends with
            you!
          </p>
        </div>

        <Suspense>
          <QuickFriendship sourceId={id} />
        </Suspense>
      </section>
    </MainContent>
  );
}
