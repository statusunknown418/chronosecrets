import SignIn from "@/components/auth/SignIn";
import { MainContent } from "@/components/layout/MainContent";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <section className="relative flex h-full flex-col overflow-y-scroll">
      <nav className="sticky left-0 top-3 mx-2 mt-3 flex items-center gap-2 rounded-full border bg-popover p-2 text-sm text-popover-foreground sm:mx-4">
        <Button
          className="flex items-center gap-2"
          variant="ghost"
          rounding="full"
          size="sm"
        >
          <Image src="/favicon.ico" width={28} height={28} alt="logo" />
          <span className="font-semibold text-foreground">ChronoSecrets</span>
        </Button>

        <div className="flex-grow" />

        <SignIn callbackUrl="/home" />
      </nav>

      <MainContent className="gap-12 px-4 py-8">
        <section id="hero" className="flex flex-col gap-6">
          <header className="flex flex-col gap-4">
            <h1 className="text-4xl font-extrabold">Hey, wanna share some stuff?</h1>
            <p className="text-gray-500">
              This a new social network that makes it easy and fun
            </p>

            <div className="flex items-center gap-2">
              <Button rounding="full">Let&apos;s go!</Button>

              <Button variant="outline" rounding="full">
                Learn more
              </Button>
            </div>
          </header>

          <div className="flex h-56 w-full flex-col items-center justify-center rounded-lg bg-popover text-sm text-muted-foreground">
            Interactive animation
          </div>
        </section>

        <section id="features" className="flex flex-col">
          <header className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">Control your messages</h2>
            <p className="text-gray-500">
              Schedule and Send Encrypted Messages with{" "}
              <span className="text-foreground">ChronoSecrets</span>
            </p>
          </header>

          <FeatureListAutoAccordion />
        </section>
      </MainContent>
    </section>
  );
}

const FeatureListAutoAccordion = () => {
  return (
    <div className="mt-6">
      <article className="flex flex-col gap-4 rounded-t-lg border p-4">
        <header className="flex items-center justify-between text-sm font-medium">
          <h3>Private</h3>
        </header>

        <h3 className="font-bold">Keep Your Messages Confidential and Secure</h3>
        <p className="text-sm text-gray-500">
          ChronoSecrets allows you to schedule and send encrypted messages that can only
          be revealed at a certain time and seen only by the person{" "}
          <span className="text-green-500">you choose</span>. Take control of your
          messages and ensure their privacy.
        </p>

        <div className="flex h-56 w-full flex-col items-center justify-center rounded-lg bg-popover text-sm text-muted-foreground">
          Interactive animation
        </div>
      </article>

      <article className="flex flex-col gap-4 border p-4">
        <header className="flex items-center justify-between text-sm font-medium">
          <h3>Encrypted</h3>
        </header>

        <h3 className="font-bold">Send Messages with Advanced Encryption Technology</h3>

        <p className="text-sm text-gray-500">
          We use state-of-the-art encryption technology to ensure the security of your
          messages. Send confidential information with peace of mind, knowing that your
          data is protected.
        </p>

        <div className="flex h-56 w-full flex-col items-center justify-center rounded-lg bg-popover text-sm text-muted-foreground">
          Interactive animation
        </div>
      </article>

      <article className="flex flex-col gap-4 border p-4">Set a time</article>
    </div>
  );
};
