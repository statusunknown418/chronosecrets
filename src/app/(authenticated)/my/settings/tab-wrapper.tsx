"use client";

import { Tabs } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

export const TabsWrapper = ({ children }: { children: ReactNode }) => {
  const tab = useSearchParams().get("tab");

  return (
    <Tabs className="pb-14 md:pb-4" defaultValue={tab || "profile"}>
      {children}
    </Tabs>
  );
};
