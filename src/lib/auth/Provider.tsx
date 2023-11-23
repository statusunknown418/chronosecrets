"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
  session?: Session;
};

export default function NextAuthProvider({ children, session }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
