import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const MainContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <main className={cn("flex flex-col gap-4 py-4", className)}>{children}</main>;
};
