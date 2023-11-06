import { SignOut } from "@/components/auth/SignOut";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function SignOutPage() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-5 p-4 sm:p-8">
      <h2 className="text-center text-3xl">Sure you wanna leave? 😢</h2>

      <p className="text-center text-lg text-muted-foreground">
        You&apos;ll be redirected to the home page.
      </p>

      <SignOut />

      <Separator orientation="horizontal" />

      <Link href="/home">
        <Button variant="link">Go back home</Button>
      </Link>
    </main>
  );
}
