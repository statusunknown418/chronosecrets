"use client";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ArrowLeft, Inbox, PenSquare, Search, Send, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSelectedLayoutSegment } from "next/navigation";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export const links = [
  {
    name: "Home",
    href: "/home",
    icon: <Send size={20} />,
  },
  {
    name: "Inbox",
    href: "/receiving",
    icon: <Inbox size={24} />,
  },
  {
    name: "New Secret",
    href: "/secrets/new",
    icon: <PenSquare size={22} />,
  },
  {
    name: "Find people",
    href: "/search",
    icon: <Search size={24} />,
  },
  {
    name: "Settings",
    href: "/my/settings",
    icon: <User2 size={24} />,
  },
] as const;

export type Routes = (typeof links)[number]["href"];

export const Navigation = () => {
  const selectedSegment = useSelectedLayoutSegment();
  const path = usePathname();

  const { back } = useRouter();
  const [parent] = useAutoAnimate();

  const { data } = trpc.user.getFullViewer.useQuery(undefined, { refetchOnMount: false });

  return (
    <nav className="sticky inset-0 z-10 px-4 pt-3 text-muted-foreground backdrop-blur-sm backdrop-filter">
      <ul className="grid h-full w-full grid-cols-1 items-center gap-4 bg-transparent sm:grid-cols-3 sm:justify-between">
        <li className="hidden sm:flex">
          <Image src="/assets/app-logo.png" width={28} height={28} alt="app-logo" />
        </li>

        <ul
          className="flex max-w-xs items-center justify-between justify-self-center bg-transparent"
          ref={parent}
        >
          {selectedSegment !== "home" && (
            <li>
              <Button onClick={back} size="icon" variant="ghost" rounding="full">
                <ArrowLeft size={20} />
              </Button>
            </li>
          )}

          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} passHref className="focus:outline-none">
                <Button
                  iconButtonSize={"lg"}
                  size="icon"
                  variant="ghost"
                  rounding="full"
                  className={cn(path === link.href && "text-primary hover:text-primary")}
                >
                  {link.icon}
                </Button>
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden justify-self-end sm:flex">
          {data?.credits !== undefined ? (
            <li
              className={cn(
                "hidden w-max rounded-full text-sm font-medium sm:flex",
                "border border-indigo-500 px-2 py-0.5 text-indigo-300",
              )}
            >
              ${data.credits}CB
            </li>
          ) : (
            <Skeleton className="h-8 w-[6ch]" />
          )}
        </div>
      </ul>
    </nav>
  );
};
