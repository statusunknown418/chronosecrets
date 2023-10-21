"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Secret } from "@/lib/db/schema";
import { BREAKPOINTS, useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { Eye, Info, Menu, Share } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const EditMenu = ({ secret }: { secret: Secret }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(secret.shareableUrl);
    toast("Shareable link copied to clipboard!", {
      icon: <Info size={20} />,
      dismissible: true,
      description: "Paste it wherever you want",
    });
  };

  const { push } = useRouter();
  const isMobile = useMediaQuery(BREAKPOINTS.sm);

  if (!isMobile) {
    return;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="min-w-[40px]">
          <Menu size={20} className="text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onClick={copyToClipboard} className="group">
          <Share size={16} className="group-hover:animate-bounce" />
          <span>Get shareable link</span>
          <DropdownMenuShortcut>⌘⇧L</DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => push(`${secret.shareableUrl}?wasEditing=true`)}
          className="group"
        >
          <Eye size={16} className="group-hover:animate-bounce" />
          <span>Preview</span>
          <DropdownMenuShortcut>⌘⇧V</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
