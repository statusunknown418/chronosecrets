import { MainContent } from "@/components/layout/MainContent";
import { ReactNode } from "react";

export default function ReceivingAllLayout({ children }: { children: ReactNode }) {
  return <MainContent className="pt-0">{children}</MainContent>;
}
