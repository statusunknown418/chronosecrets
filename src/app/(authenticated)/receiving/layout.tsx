import { ReactNode } from "react";

export default function ReceivingAllLayout({ children }: { children: ReactNode }) {
  return <main className="flex flex-col gap-4">{children}</main>;
}
