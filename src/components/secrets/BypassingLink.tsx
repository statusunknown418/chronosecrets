"use client";

import { trpc } from "@/lib/trpc/client";
import { Rocket, ShieldQuestion } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const BASE_URL = "https://wait4it.vercel.app";

export const BypassingLink = () => {
  const { data, isLoading } = trpc.user.getFullViewer.useQuery();
  const [copied, update] = useState(false);

  if (isLoading || !data) return;

  if (!data.username)
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            rounding="full"
            className="absolute bottom-5 right-5 border border-indigo-500 bg-indigo-700 text-foreground hover:border-indigo-300 hover:bg-indigo-600 hover:text-foreground"
          >
            <ShieldQuestion size={20} />
            Hmmm, click here
          </Button>
        </PopoverTrigger>

        <PopoverContent className="flex w-[260px] flex-col gap-2 text-sm" sideOffset={5}>
          <h3 className="text-base text-foreground">
            Something nice is waiting for you!
          </h3>
          <p>
            There&apos;s a special link for you to share secrets with friends, but you
            need to have your <span className="text-foreground">username</span> set up
            first!
          </p>
          <Link
            href={{
              pathname: "/my/settings",
              query: { tab: "profile", verifyOn: "username", goBackTo: "/home" },
            }}
          >
            <Button variant="link" className="p-0">
              Click here to do it!
            </Button>
          </Link>{" "}
        </PopoverContent>
      </Popover>
    );

  const quickLink = `${BASE_URL}/secrets/new?bypass=true&sendingId=${data.id}&sendingUsername=${data.username}`;

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
          className="absolute bottom-5 right-5 border border-indigo-500 bg-indigo-700 text-foreground hover:border-indigo-300 hover:bg-indigo-600 hover:text-foreground"
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
