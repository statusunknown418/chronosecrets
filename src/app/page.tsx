import SignIn from "@/components/auth/SignIn";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <section className="relative flex h-full flex-col gap-4">
      <nav className="sticky inset-0 mx-4 mt-3 flex items-center gap-2 rounded-full border bg-popover p-2 text-sm text-popover-foreground">
        <Button
          className="flex items-center gap-2"
          variant="ghost"
          rounding="full"
          size="sm"
        >
          <Image src="/favicon.ico" width={28} height={28} alt="logo" />
          <span className="font-semibold text-foreground">ChronoSecrets</span>
        </Button>

        <div className="flex-grow"></div>

        <SignIn callbackUrl="/home" />
      </nav>

      <main className="flex flex-grow flex-col items-center justify-center gap-6 p-5">
        <header className="flex flex-col gap-3 text-center">
          <h1 className="text-3xl font-bold">Hey, wanna share some stuff?</h1>
          <p className="text-gray-500">
            This a new social network that makes it easy and fun
          </p>
        </header>
      </main>
    </section>
  );
}
