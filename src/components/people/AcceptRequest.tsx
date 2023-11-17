"use client";
import { trpc } from "@/lib/trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";

export const AcceptRequest = ({
  sourceId,
  targetId,
}: {
  sourceId: string;
  targetId: string;
}) => {
  const { push } = useRouter();

  const { mutate: accept, isLoading } = trpc.friendships.acceptFriendRequest.useMutation({
    onSuccess: () => {
      toast.success("Request accepted!");
      push("/my/settings?tab=people");
    },
    onError: () => toast.error("Failed to accept request"),
  });

  return (
    <Button
      loading={isLoading}
      onClick={() =>
        accept({
          sourceId,
          userId: targetId,
        })
      }
    >
      Accept
    </Button>
  );
};
