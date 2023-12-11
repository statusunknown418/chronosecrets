import { MainContent } from "@/components/layout/MainContent";
import { ReactNode } from "react";

export default function HomeLayout({
  children,
}: {
  children: ReactNode;
  params: { slug: string };
}) {
  return <MainContent>{children}</MainContent>;
}
