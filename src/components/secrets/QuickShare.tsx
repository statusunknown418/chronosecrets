"use client";
import { Share } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export const QuickShare = ({ url }: { url: string }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast.success("Shareable link copied to clipboard!");
  };

  return (
    <Button size={"icon"} variant={"ghost"} onClick={copyToClipboard}>
      <Share size={20} className="text-muted-foreground" />
    </Button>
  );
};
