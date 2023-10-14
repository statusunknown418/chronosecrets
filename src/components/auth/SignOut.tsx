"use client";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export const SignOut = () => {
  return (
    <Button
      variant="outline"
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
    >
      Sign out
    </Button>
  );
};
