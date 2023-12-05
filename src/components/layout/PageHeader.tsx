"use client";
import { X } from "@phosphor-icons/react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import { links } from "./NavigationWrapper";

export const PageHeader = ({
  back = false,
  title,
  extra,
}: {
  title?: string;
  back?: boolean;
  extra?: ReactNode;
}) => {
  const path = usePathname();
  const { id, shareableUrl } = useParams();

  if (id || shareableUrl) {
    return;
  }

  return (
    <section className="sticky inset-0 z-10 flex w-full flex-col gap-2 border-b bg-background/20 px-4 py-4 backdrop-blur backdrop-filter sm:px-14">
      {extra && extra}
      <header className="flex h-7 w-full items-center justify-between gap-4">
        <h1 className="text-xl font-bold sm:text-2xl">
          {links.find((l) => l.href === path)?.name ?? title}
        </h1>

        {back && (
          <Link href="/home" className="focus-within:outline-none">
            <Button variant="ghost" size="icon">
              <X size={20} className="text-muted-foreground" />
            </Button>
          </Link>
        )}
      </header>
    </section>
  );
};
