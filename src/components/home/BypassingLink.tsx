"use client";

import { trpc } from "@/lib/trpc/client";
import { Book, Coins, File, Link2, Rocket, ShieldQuestion, Users2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://wait4it.vercel.app";

const BypassingLink = () => {
  const { data, isLoading } = trpc.user.getFullViewer.useQuery();
  const [bypassDialog, setBypassDialog] = useState(false);
  const [shareProfileDialog, setShareProfileDialog] = useState(false);
  const [referralDialog, setReferralDialog] = useState(false);

  if (isLoading || !data) return;

  if (!data.username) return <AccountNotSetup />;

  const copyToClipboard = () => {
    const quickLink = `${BASE_URL}/secrets/new?bypass=true&sendingId=${data.id}&sendingUsername=${data.username}`;

    navigator.clipboard.writeText(quickLink);
    toast.success("You've got the link!", {
      description: "Share it wherever you want!",
    });
  };

  const shareProfileWithFriends = () => {
    const shareProfileLink = `${BASE_URL}/quick/${data.username}?sourceId=${data.id}`;

    navigator.clipboard.writeText(shareProfileLink);
    toast.success("it's copied!", {
      description: "Send it over to your friends!",
    });
  };

  return (
    <div className="fixed bottom-4 left-4 z-20">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            rounding="full"
            size="icon"
            className="border border-indigo-500 bg-indigo-700 text-foreground hover:border-indigo-300 hover:bg-indigo-600 hover:text-foreground"
          >
            <Rocket size={16} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent sideOffset={5} align="start" className="w-[200px]">
          <DropdownMenuLabel>Quick Access</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setBypassDialog(true)}>
              <Link2 size={16} />
              Bypassing link
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setShareProfileDialog(true)}>
              <Users2 size={16} />
              Quick friendship
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setReferralDialog(true)} disabled>
              <Coins size={16} />
              Referrals (Soon!)
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuLabel>Learn</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem disabled>
              <Book size={16} />
              Changelog (Soon!)
            </DropdownMenuItem>

            <DropdownMenuItem disabled>
              <File size={16} />
              Blog (Soon!)
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={bypassDialog} onOpenChange={setBypassDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bypassing link</DialogTitle>

            <div className="my-4 flex h-40 w-full items-center justify-center rounded-lg border text-sm text-muted-foreground">
              Link animation or small video here
            </div>

            <DialogDescription>
              Share an instant, <span className="text-foreground">quick</span> secret
              creation link to friends. No account setup needed!
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-2">
            <Button rounding="full" size="sm" onClick={copyToClipboard}>
              I want it!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={shareProfileDialog} onOpenChange={setShareProfileDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share your profile!</DialogTitle>

            <div className="my-4 flex h-40 w-full items-center justify-center rounded-lg border text-sm text-muted-foreground">
              Link animation or small video here
            </div>

            <DialogDescription className="p-1 text-left">
              Share this to anyone you already know and want to join{" "}
              <span className="text-foreground">ChronoSecrets</span>, with this link he or
              she will be able to automatically add you as a{" "}
              <span className="text-foreground">friend</span>. They just need to and sign
              up & accept the request!
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-2">
            <Button rounding="full" onClick={shareProfileWithFriends}>
              Let&apos;s do it!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={referralDialog} onOpenChange={setReferralDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yes we also do referrals!</DialogTitle>

            <div className="my-4 flex h-40 w-full items-center justify-center rounded-lg border text-sm text-muted-foreground">
              Link animation or small video here
            </div>

            <DialogDescription className="p-1 text-left">
              Invite as many people as you want to ChronoSecrets and earn up to{" "}
              <span className="font-mono text-base text-indigo-400">$50CB</span> per new
              user registered!
            </DialogDescription>

            <DialogDescription className="p-1 text-foreground">
              You just need to share the link and we&apos;ll take care of the rest!
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-2">
            <Button rounding="full" onClick={shareProfileWithFriends}>
              Let&apos;s do it!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const AccountNotSetup = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          rounding="full"
          className="absolute bottom-5 left-5 border border-indigo-500 bg-indigo-700 text-foreground hover:border-indigo-300 hover:bg-indigo-600 hover:text-foreground"
        >
          <ShieldQuestion size={20} />
          Warn?
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="flex w-[260px] flex-col gap-2 text-sm"
        sideOffset={5}
        align="start"
      >
        <h3 className="text-base font-medium text-foreground">
          Something nice is waiting for you!
        </h3>
        <p>
          There&apos;are special features waiting for you, however this requires to set up
          your <span className="text-foreground">USERNAME</span> first!
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
};

export default BypassingLink;
