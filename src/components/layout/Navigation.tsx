"use client";
import { cn } from "@/lib/utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ArrowLeft, Home, MailPlus, Search, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSelectedLayoutSegment } from "next/navigation";
import { Button } from "../ui/button";

export const links = [
  {
    name: "Home",
    href: "/home",
    icon: <Home size={24} className="fill-inherit" />,
  },
  {
    name: "New Secret",
    href: "/secrets/new",
    icon: <MailPlus size={24} className="fill-inherit" />,
  },
  {
    name: "Find people",
    href: "/search",
    icon: <Search size={24} className="fill-inherit" />,
  },
  {
    name: "Settings",
    href: "/my/settings",
    icon: <Settings size={24} className="fill-inherit" />,
  },
] as const;

export type Routes = (typeof links)[number]["href"];

export const Navigation = () => {
  const selectedSegment = useSelectedLayoutSegment();
  const path = usePathname();

  const { back } = useRouter();
  const [parent] = useAutoAnimate();

  return (
    <nav className="sticky inset-0 z-10 h-16 px-4 py-2 text-muted-foreground backdrop-blur backdrop-filter">
      <ul className="flex h-full w-full items-center justify-center gap-4 sm:justify-between">
        <li className="hidden sm:flex">LOGO</li>

        <ul
          className="flex max-w-xs flex-grow items-center justify-between justify-self-center"
          ref={parent}
        >
          {selectedSegment !== "home" && (
            <li className="">
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
                  className={cn(
                    path === link.href ? "text-primary hover:text-primary" : "",
                  )}
                >
                  {link.icon}
                </Button>
              </Link>
            </li>
          ))}
        </ul>

        <li className="hidden sm:flex">LOGO</li>
      </ul>
    </nav>
  );
};
