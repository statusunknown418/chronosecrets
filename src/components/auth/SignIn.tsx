"use client";
import { ArrowRight } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export default function SignIn({
  callbackUrl,
  label = "Sign in",
}: {
  callbackUrl?: string;
  label?: string;
}) {
  const { data: session, status } = useSession();

  if (status === "loading") return <Skeleton className="h-8 w-10" />;

  if (session) {
    return (
      <Link href="home">
        <Button variant="ghost" rounding="full" size="sm" className="group">
          Go home{" "}
          <ArrowRight size={15} className="transition-all group-hover:translate-x-1" />
        </Button>
      </Link>
    );
  }
  return (
    <Button onClick={() => signIn(undefined, { callbackUrl })} rounding="full" size="sm">
      {label}
    </Button>
  );
}
