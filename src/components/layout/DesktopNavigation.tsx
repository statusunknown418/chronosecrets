import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../ui/button";
import { links } from "./NavigationWrapper";

export const DesktopNavigation = () => {
  const path = usePathname();

  return (
    <div className="hidden min-w-[200px] grid-cols-1 grid-rows-3 border-r px-2 py-8 shadow shadow-indigo-800 md:grid md:h-full">
      <div className="flex cursor-default select-none items-center gap-2 self-start px-2">
        <Image src="/favicon.ico" width={25} height={25} alt="app-logo" priority />
        <h1 className="text-sm font-semibold">ChronoSecrets</h1>
      </div>

      <nav className="flex h-full w-full flex-col items-start gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={buttonVariants({
              rounding: "full",
              variant: "ghost",
              alignment: "start",
              className: cn(
                "h-20 w-full",
                link.href === path ? "text-indigo-400" : "text-popover-foreground",
              ),
            })}
          >
            {link.icon}
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};
