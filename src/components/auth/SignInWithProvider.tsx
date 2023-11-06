"use client";
import { BuiltInProviderType } from "@auth/core/providers";
import { LiteralUnion, signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { ReactNode, useState } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export const SigninWithProvider = ({
  provider,
  icon,
}: {
  provider: LiteralUnion<BuiltInProviderType>;
  icon: ReactNode;
}) => {
  const redirect = useSearchParams().get("callbackUrl");
  const [signingIn, start] = useState(false);

  const onClick = () => {
    start(true);

    signIn(provider, { callbackUrl: redirect || "/home" });
  };

  return (
    <Button onClick={onClick} className="group" variant="outline">
      {signingIn && <Spinner size="sm" />}

      {icon}

      <span>Sign in with {provider}</span>
    </Button>
  );
};
