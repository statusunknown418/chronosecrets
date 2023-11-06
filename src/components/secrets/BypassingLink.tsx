"use client";
import { trpc } from "@/lib/trpc/client";
import { Rocket } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const BypassingLink = () => {
  const { data } = trpc.user.getFullViewer.useQuery();
  const [copied, update] = useState(false);

  if (!data?.username) return;

  const quickLink = `http://localhost:3000/secrets/new?bypass=true&sendingId=${data.id}&sendingUsername=${data.username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(quickLink);
    toast.success("You've got the link!", {
      description: "Share it wherever you want!",
    });

    update(true);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          rounding="full"
          className="absolute bottom-5 right-5 border border-indigo-400 bg-indigo-600 text-foreground hover:border-indigo-300 hover:bg-indigo-500 hover:text-foreground"
        >
          <Rocket size={20} />
          {copied ? "Awesome!" : "Click me!"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="flex w-[260px] flex-col gap-3">
        <h3 className="font-bold text-foreground">Start receiving secrets now</h3>

        <p className="text-sm">
          Share an instant, <span className="text-foreground">quick</span> secret creation
          link to friends. No account setup needed!
        </p>

        <Button rounding="full" size="sm" onClick={copyToClipboard}>
          {copied ? "You've got it!" : "Give it to me!"}
        </Button>
      </PopoverContent>
    </Popover>
  );
};
