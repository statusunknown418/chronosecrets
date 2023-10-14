"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";

export default function SignIn() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <Button variant={"destructive"} onClick={() => signOut()}>
          Sign out
        </Button>
      </>
    );
  }
  return (
    <section>
      <p>Not signed in</p>
      <br />
      <Button
        onClick={() =>
          signIn("discord", {
            callbackUrl: "/home",
          })
        }
      >
        Sign in with Discord
      </Button>
    </section>
  );
}
