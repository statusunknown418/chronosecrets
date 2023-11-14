"use client";

import { AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

export const BypassingBanner = () => {
  const sendingUsername = useSearchParams().get("sendingUsername");
  const bypass = useSearchParams().get("bypass");

  return (
    bypass && (
      <div className="mx-4 mb-4 flex items-start gap-2 rounded-lg border border-yellow-500/50 bg-yellow-900/40 p-3 text-xs text-yellow-200/80 sm:items-center sm:text-sm">
        <span className="pt-0.5">
          <AlertCircle size={14} />
        </span>

        <span>
          Heads up - The current link is bypassing the normal flow and thus you&apos;ll
          only be able to send this secret to{" "}
          <span className="text-yellow-50">{sendingUsername}!</span>
        </span>
      </div>
    )
  );
};
