"use client";
import { useReceiverDataStore } from "@/lib/hooks/useReceiverDataStore";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { animated, useSpring } from "@react-spring/web";
import { ArrowLeft, BookLock, Inbox, PenSquare, Search, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSelectedLayoutSegment } from "next/navigation";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export const links = [
  {
    name: "Home",
    href: "/home",
    icon: <BookLock size={20} />,
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
  const clear = useReceiverDataStore((s) => s.clear);

  const { data } = trpc.user.getFullViewer.useQuery(undefined, { refetchOnMount: false });

  const { number } = useSpring({
    from: { number: 0 },
    number: data?.credits ?? 0,
    delay: 100,
    config: { mass: 2, tension: 40, friction: 20 },
  });

  return (
    <section className="sticky inset-0 z-10 flex flex-col gap-2 bg-background/40 px-4 pb-2 pt-3 backdrop-blur backdrop-filter sm:px-10">
      <nav className="w-full text-muted-foreground">
        <ul className="grid h-full w-full grid-cols-1 items-center gap-4 bg-transparent sm:grid-cols-3 sm:justify-between">
          <li className="hidden sm:flex">
            <Image
              src="/assets/app-logo.png"
              width={28}
              height={28}
              alt="app-logo"
              priority
            />
          </li>

          <ul
            className="flex w-full max-w-sm items-center justify-between gap-1 justify-self-center rounded-full border bg-popover/70 p-1 backdrop-blur backdrop-filter md:w-auto"
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
                    size="icon"
                    variant="ghost"
                    rounding="full"
                    className={cn(
                      path === link.href && "text-primary hover:text-primary",
                    )}
                    onClick={() => {
                      if (link.href !== "/secrets/new") return;

                      clear();
                    }}
                  >
                    {link.icon}
                  </Button>

                  <span className="sr-only">{link.name}</span>
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
                $<animated.span>{number.to((n) => n.toFixed(0))}</animated.span>
                CB
              </li>
            ) : (
              <Skeleton className="h-8 w-[6ch]" />
            )}
          </div>
        </ul>
      </nav>
    </section>
  );
};
