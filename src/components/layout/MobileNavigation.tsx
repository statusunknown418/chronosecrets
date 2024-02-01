"use client";
import { useReceiverDataStore } from "@/lib/hooks/useReceiverDataStore";
import { useWindowSize } from "@/lib/hooks/useWindowSize";
import { RouterOutputs } from "@/lib/server/routers/_app";
import { cn } from "@/lib/utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { animated, useSpring } from "@react-spring/web";
import { ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSelectedLayoutSegment } from "next/navigation";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { links } from "./NavigationWrapper";

const DynamicRocketDropdown = dynamic(() => import("@/components/home/BypassingLink"));

export const MobileNavigation = ({
  user,
}: {
  user?: RouterOutputs["user"]["getFullViewer"];
}) => {
  const selectedSegment = useSelectedLayoutSegment();
  const path = usePathname();
  const { width } = useWindowSize();
  const clearSyncedReceiver = useReceiverDataStore((s) => s.clear);

  const { back } = useRouter();
  const [parent] = useAutoAnimate();

  const { number } = useSpring({
    from: { number: 0 },
    number: user?.credits ?? 0,
    delay: 100,
    config: { mass: 2, tension: 40, friction: 20 },
  });

  return (
    <>
      <div className="sticky inset-0 z-10 flex flex-col gap-2 bg-background/40 px-4 pt-3 backdrop-blur backdrop-filter sm:px-8 md:hidden">
        <nav className="w-full text-muted-foreground">
          <ul className="grid h-full w-full grid-cols-1 items-center gap-4 bg-transparent sm:grid-cols-3 sm:justify-between">
            <button className="hidden w-max sm:flex sm:items-center sm:gap-2">
              <Image
                src="/assets/app-logo.png"
                width={25}
                height={25}
                alt="app-logo"
                priority
              />
            </button>

            <ul
              className="flex w-full max-w-sm items-center justify-between gap-1 justify-self-center rounded-full border bg-popover/70 p-1 backdrop-blur backdrop-filter sm:w-max md:w-auto"
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
                  <Link
                    href={link.href}
                    passHref
                    className="focus:outline-none"
                    onClick={() => {
                      if (link.href === "/secrets/new") {
                        clearSyncedReceiver();
                      }
                    }}
                  >
                    <Button
                      size="icon"
                      variant="ghost"
                      rounding="full"
                      className={cn(
                        path === link.href && "text-primary hover:text-primary",
                      )}
                    >
                      <span className="sr-only">{link.name}</span>
                      {link.icon}
                    </Button>

                    <span className="sr-only">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hidden justify-self-end sm:flex">
              {user?.credits !== undefined ? (
                <li
                  className={cn(
                    "hidden w-max rounded-full font-mono text-sm font-medium sm:flex",
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
      </div>

      {width < 768 && <DynamicRocketDropdown />}
    </>
  );
};
