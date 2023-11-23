import { MainContent } from "@/components/layout/MainContent";
import { PageHeader } from "@/components/layout/PageHeader";
import { ReactNode } from "react";

export default function HomeLayout({
  children,
}: {
  children: ReactNode;
  params: { slug: string };
}) {
  return (
    <MainContent>
      <PageHeader title="My secrets" />

      <div className="h-full px-4">{children}</div>
    </MainContent>
  );
}
