"use client";
import { trpc } from "@/lib/trpc/client";
import { Share } from "lucide-react";
import { toast } from "sonner";
import { BASE_URL } from "../home/BypassingLink";
import { Button } from "../ui/button";

export const QuickShare = ({ url }: { url: string }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast.success("Shareable link copied to clipboard!", {
      description: "Share it wherever you want!",
    });
  };

  return (
    <Button size={"icon"} variant={"ghost"} onClick={copyToClipboard}>
      <Share size={20} className="text-muted-foreground" />
    </Button>
  );
};

export const ShareCustomLink = () => {
  const { data } = trpc.user.getFullViewer.useQuery();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `${BASE_URL}/secrets/new?bypass=true&sendingId=${data?.id}&sendingUsername=${data?.username}`,
    );
    toast.success("Shareable link copied to clipboard!", {
      description: "Share it wherever you want!",
    });
  };

  return (
    <Button variant="link" onClick={copyToClipboard}>
      <Share size={16} />
      Share your custom link!
    </Button>
  );
};
