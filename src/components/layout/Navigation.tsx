"use client";
import { cn } from "@/lib/utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  ArrowLeft,
  MailPlus,
  Satellite,
  SatelliteDish,
  Search,
  User2,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSelectedLayoutSegment } from "next/navigation";
import { Button } from "../ui/button";

export const links = [
  {
    name: "Home",
    href: "/home",
    icon: <SatelliteDish size={24} />,
  },
  {
    name: "Inbox",
    href: "/receiving",
    icon: <Satellite size={24} />,
  },
  {
    name: "New Secret",
    href: "/secrets/new",
    icon: <MailPlus size={24} />,
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

  return (
    <nav className="sticky inset-0 z-10 px-4 py-2 text-muted-foreground backdrop-blur-sm backdrop-filter">
      <ul className="flex h-full w-full items-center justify-center gap-4 bg-transparent sm:justify-between">
        <li className="hidden sm:flex">LOGO</li>

        <ul
          className="flex max-w-xs flex-grow items-center justify-between justify-self-center bg-transparent"
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

        <li className="hidden sm:flex">LOGO</li>
      </ul>
    </nav>
  );
};
