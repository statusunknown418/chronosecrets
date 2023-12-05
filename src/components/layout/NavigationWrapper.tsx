"use client";
import { breakpoints, useWindowSize } from "@/lib/hooks/useWindowSize";
import { trpc } from "@/lib/trpc/client";
import { Inbox, PenSquare, Search, Send, User2 } from "lucide-react";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";

export const links = [
  {
    name: "Home",
    href: "/home",
    icon: <Send size={20} />,
  },
  {
    name: "Inbox",
    href: "/receiving",
    icon: <Inbox size={22} />,
  },
  {
    name: "New Secret",
    href: "/secrets/new",
    icon: <PenSquare size={22} />,
  },
  {
    name: "Search",
    href: "/search",
    icon: <Search size={22} />,
  },
  {
    name: "Settings",
    href: "/my/settings",
    icon: <User2 size={22} />,
  },
] as const;

export type Routes = (typeof links)[number]["href"];

const NavigationWrapper = () => {
  const { width } = useWindowSize();
  const { data } = trpc.user.getFullViewer.useQuery(undefined, { refetchOnMount: false });

  return (
    <>
      {width <= breakpoints.md && <MobileNavigation user={data} />}

      <DesktopNavigation />
    </>
  );
};

export default NavigationWrapper;
