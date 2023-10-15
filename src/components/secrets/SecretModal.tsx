"use client";

import { Secret } from "@/lib/db/schema";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { SecretForm } from "./SecretForm";

export const SecretModal = ({
  secret,
  emptyState,
}: {
  secret?: Secret;
  emptyState?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!secret?.id;
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        {emptyState ? (
          <Button variant="link" size="sm">
            <Plus size={16} />
            New secret
          </Button>
        ) : (
          <Button
            variant={editing ? "ghost" : "outline"}
            size={editing ? "sm" : "icon"}
            className="p-0"
          >
            {editing ? "Edit" : <Plus size={16} />}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editing ? "Edit" : "New"} secret</DialogTitle>
        </DialogHeader>

        <div>
          <SecretForm closeModal={closeModal} secret={secret} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
