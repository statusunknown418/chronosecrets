import Link from "next/link";
import { Button } from "../ui/button";

export const UncompletedProfile = () => {
  return (
    <>
      <div className="flex items-center gap-1 rounded-lg border border-yellow-800 bg-yellow-950 p-4 text-yellow-600">
        <p className="text-sm">
          Before you can add friends you need to setup a username for them to find you!
        </p>
      </div>

      <Link
        href={{
          pathname: "/my/settings",
          query: {
            goBackTo: "/search",
            verifyOn: "username",
          },
        }}
        className="focus-within::ring-ring w-max rounded-lg focus-within:outline-none focus-within:ring focus-within:ring-offset-2 focus:outline-none focus:ring-offset-2 focus:ring-offset-background"
      >
        <Button>Ok, take me there!</Button>
      </Link>

      <p className="text-sm text-muted-foreground">
        DEV note: Some animation or images here to fill up space
      </p>
    </>
  );
};
