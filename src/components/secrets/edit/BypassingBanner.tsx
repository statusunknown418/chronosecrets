"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

export const BypassingBanner = () => {
  const sendingUsername = useSearchParams().get("sendingUsername");
  const bypass = useSearchParams().get("bypass");

  return (
    bypass && (
      <div className="px-4">
        <Alert variant="warning">
          <AlertCircle size={20} />

          <AlertTitle>QuickLink detected</AlertTitle>

          <AlertDescription>
            Heads up - The current link is bypassing the normal flow and so you&apos;ll
            only be able to send this secret to{" "}
            <span className="text-yellow-50">{sendingUsername}!</span>
          </AlertDescription>
        </Alert>
      </div>
    )
  );
};
