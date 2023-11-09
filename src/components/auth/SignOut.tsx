"use client";
import { LogOut } from "lucide-react";
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
      <LogOut size={16} className="rotate-180 text-destructive" />
      Sign out
    </Button>
  );
};
