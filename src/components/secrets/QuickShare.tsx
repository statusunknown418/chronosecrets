"use client";
import { trpc } from "@/lib/trpc/client";
import { CheckCircle, Share } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { BASE_URL } from "../home/BypassingLink";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

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
  const [done, setDone] = useState(false);

  const fullUrl = `${BASE_URL}/secrets/new?bypass=true&sendingId=${data?.id}&sendingUsername=${data?.username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl);

    toast.success("Shareable link copied to clipboard!", {
      description: "Share it wherever you want!",
    });

    setDone(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" type="button" size={"sm"} className="p-0">
          Share your custom link!
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Unique custom link!</DialogTitle>
          <DialogDescription>
            This link will allow your friends to bypass the regular secret creation flow
            and send secrets to yourself right away.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-0">
          <Input value={fullUrl} readOnly />
          <Button onClick={copyToClipboard}>
            {done ? <CheckCircle size={16} /> : "Copy"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
