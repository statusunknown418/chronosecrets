"use client";
import { trpc } from "@/lib/trpc/client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";

export const QuickFriendship = ({ sourceId }: { sourceId: string }) => {
  const { replace } = useRouter();
  const currentPath = usePathname();

  const utils = trpc.useUtils();

  const {
    data,
    isLoading: friendsLoading,
    error,
  } = trpc.friendships.getFriends.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  const { mutate, isLoading } = trpc.friendships.quickFriendship.useMutation({
    onSuccess: () => {
      toast.success("You're friends now!");

      Promise.all([
        utils.friendships.getFriends.invalidate(),
        utils.friendships.getAcceptedFriends.invalidate(),
      ]);

      replace("/my/settings?tab=people");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (error)
    return (
      <div className="flex items-center gap-2">
        <p className="text-sm text-muted-foreground">
          Oh you just need to sign up first!
        </p>

        <Link
          href={{
            pathname: "/auth/signin",
            query: { callbackUrl: `/${currentPath}?sourceId=${sourceId}` },
          }}
        >
          <Button variant="link" className="p-0">
            Click here!
          </Button>
        </Link>
      </div>
    );

  if (friendsLoading) return <Button loading />;

  if (data?.viewer.id === sourceId) {
    return <Button disabled>That&apos;s you!</Button>;
  }

  if (data?.people.some((p) => p.userId === sourceId || p.sourceId === sourceId)) {
    return (
      <div className="flex flex-col gap-2">
        <Button disabled>Already friends!</Button>

        <p className="text-sm text-muted-foreground">
          Feel free to go{" "}
          <Link href="/home">
            <Button variant="link" className="p-0">
              home
            </Button>
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <Button loading={isLoading} onClick={() => mutate({ sourceId })}>
        Yeah, cool!
      </Button>

      <Link href="/home">
        <Button variant="ghost">Nah, I&apos;m good</Button>
      </Link>
    </div>
  );
};
