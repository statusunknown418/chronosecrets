"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function SignIn({
  callbackUrl,
  label = "Sign in",
}: {
  callbackUrl?: string;
  label?: string;
}) {
  const { data: session, status } = useSession();

  if (status === "loading")
    return (
      <span className="flex h-10 items-center justify-center text-sm">Just a sec...</span>
    );

  if (session) {
    return (
      <Link href="home">
        <Button variant="link">Go home</Button>
      </Link>
    );
  }
  return <Button onClick={() => signIn(undefined, { callbackUrl })}>{label}</Button>;
}
