"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Secret } from "@/lib/db/schema";
import { trpc } from "@/lib/trpc/client";
import { Eye, Info, Menu, Share, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const EditMenu = ({ secret }: { secret: Secret }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(secret.shareableUrl);
    toast.success("Shareable link copied to clipboard!", {
      icon: <Info size={20} />,
      description: "Paste it wherever you want",
    });
  };

  const utils = trpc.useUtils();

  const [openAlert, setOpenAlert] = useState(false);
  const { push, replace } = useRouter();

  const { mutateAsync, isLoading } = trpc.secrets.deleteSecret.useMutation({
    onSuccess: async () => {
      await utils.secrets.getSecrets.invalidate();
      replace("/home");
    },
  });
  return (
    <>
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

          <DropdownMenuItem
            className="group text-destructive focus:text-destructive"
            onClick={() => {
              setOpenAlert(true);
            }}
          >
            <Trash size={16} className="group-hover:animate-bounce" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog onOpenChange={setOpenAlert} open={openAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. This secret will be deleted forever. The
              receiver will <strong>not</strong> be notified 👀.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                toast.promise(mutateAsync({ id: secret.id }), {
                  success: "Secret deleted!",
                  error: "Something went wrong",
                  loading: "Deleting...",
                });
              }}
            >
              {isLoading ? "Deleting..." : "Yes, do it"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
