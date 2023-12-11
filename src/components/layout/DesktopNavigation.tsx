import { RouterOutputs } from "@/lib/server/routers/_app";
import { cn } from "@/lib/utils";
import { animated, useSpring } from "@react-spring/web";
import { Coins, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BypassingLink from "../home/BypassingLink";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { links } from "./NavigationWrapper";

export const DesktopNavigation = ({
  user,
}: {
  user?: RouterOutputs["user"]["getFullViewer"];
}) => {
  const path = usePathname();

  const { number } = useSpring({
    from: { number: 0 },
    number: user?.credits ?? 0,
    delay: 100,
    config: { mass: 2, tension: 40, friction: 20 },
  });

  return (
    <div className="md::h-full hidden min-w-[190px] grid-cols-1 grid-rows-3 border-r md:grid lg:min-w-[240px]">
      <header className="flex flex-col gap-6 px-4">
        <div className="flex h-[60px] cursor-default select-none items-center gap-2 self-start">
          <Image src="/favicon.ico" width={25} height={25} alt="app-logo" priority />
          <h1 className="text-sm font-semibold">ChronoSecrets</h1>
        </div>

        {user?.credits !== undefined ? (
          <div className="flex items-center gap-1">
            <li
              className={cn(
                "hidden w-max cursor-default select-none items-center gap-0.5 rounded-full font-mono text-xs font-medium sm:flex",
                "h-7 border border-indigo-500 px-2 text-foreground/90 shadow-black hover:shadow-lg",
              )}
            >
              <Coins size={15} className="text-indigo-400" />
              <animated.span>{number.to((n) => n.toFixed(0))}</animated.span>
              CB
            </li>

            <Link href="/my/settings?tab=chronoBucks">
              <Button
                rounding={"full"}
                variant={"outline"}
                className="h-7 w-7 border-indigo-500 p-0 text-indigo-400"
              >
                <Plus size={14} />
              </Button>
            </Link>
          </div>
        ) : (
          <Skeleton className="ml-4 h-7 w-[10ch]" />
        )}
      </header>

      <nav className="flex h-full w-full flex-col items-start gap-1 px-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex h-12 w-full items-center gap-2.5 rounded-full border border-transparent px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-popover",
              link.href === path
                ? "bg-popover text-indigo-400 shadow-black"
                : "text-popover-foreground",
            )}
          >
            {link.icon}
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>

      <BypassingLink mode="desktop" />
    </div>
  );
};
