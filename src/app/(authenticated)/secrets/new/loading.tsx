"use client";
import { Spinner } from "@/components/ui/spinner";
import { Hammer } from "lucide-react";

export default function NewSecretPageLoader() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
      <Spinner size="lg" />

      <h2 className="text-muted-foreground">Assembling the components</h2>

      <Hammer size={40} className="animate-bounce text-indigo-400" />
    </div>
  );
}
