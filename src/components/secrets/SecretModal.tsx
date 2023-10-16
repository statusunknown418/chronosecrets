"use client";

import { Secret } from "@/lib/db/schema";
import { Pen, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import SecretForm from "./SecretForm";

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
          <Button variant={editing ? "ghost" : "outline"} size="icon">
            <Pen size={16} />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editing ? "Edit" : "New"} secret</DialogTitle>
        </DialogHeader>

        <SecretForm closeModal={closeModal} secret={secret} />
      </DialogContent>
    </Dialog>
  );
};
