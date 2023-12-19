import SignIn from "@/components/auth/SignIn";
import { AnimationWrapper } from "@/components/home/AnimationWrapper";
import { MainContent } from "@/components/layout/MainContent";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="relative flex h-full flex-col items-center overflow-y-scroll">
      <nav className="sticky top-3 mt-3 flex max-w-2xl items-center gap-5 rounded-full border bg-popover/70 p-2 text-sm text-popover-foreground backdrop-blur backdrop-filter">
        <Button variant="ghost" rounding="full" size="sm">
          <Image src="/favicon.ico" width={28} height={28} alt="logo" />
          <span className="font-semibold text-foreground">ChronoSecrets</span>
        </Button>

        <nav className="hidden flex-grow items-center gap-4 sm:flex">
          <Link href={"#features"}>
            <Button variant="ghost" rounding="full" size="sm">
              Encryption
            </Button>
          </Link>
          <Link href={"#features"}>
            <Button variant="ghost" rounding="full" size="sm">
              Scheduling
            </Button>
          </Link>
          <Link href={"#features"}>
            <Button variant="ghost" rounding="full" size="sm">
              Network
            </Button>
          </Link>
        </nav>

        <SignIn callbackUrl="/home" />
      </nav>

      <MainContent className="max-w-6xl gap-12 px-6 md:gap-14">
        <HeroSection />

        <section id="features" className="flex flex-col items-center gap-7">
          <header className="flex flex-col gap-2">
            <h2 className="text-center text-3xl font-medium lg:text-4xl">
              Control your messages
            </h2>
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

const HeroSection = () => {
  return (
    <section id="hero" className="mt-12 flex flex-col gap-4">
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-center text-4xl font-black md:text-5xl lg:text-6xl">
          Schedule and Send Encrypted Messages with Ease
        </h1>

        <section className="flex flex-col gap-4">
          <p className="text-center text-gray-500 md:text-lg">
            This a new social network that makes it easy and fun
          </p>

          <div className="flex items-center justify-center gap-2">
            <Link
              href={"/home"}
              className={buttonVariants({
                rounding: "full",
              })}
            >
              <Sparkles size={15} />
              Let&apos;s go!
            </Link>

            <Button variant="outline" rounding="full">
              Learn more
            </Button>
          </div>
        </section>
      </header>
      <div className="flex h-[300px] w-full items-center justify-center sm:h-[400px] md:h-[600px]">
        <AnimationWrapper scene="https://prod.spline.design/QIFwSFfKV9dMHncU/scene.splinecode" />
      </div>
    </section>
  );
};

const FeatureListAutoAccordion = () => {
  return (
    <div className="mt-6 grid grid-cols-1 md:gap-5">
      <article className="flex flex-col gap-4 rounded-t-lg border p-4">
        <header className="flex items-center justify-between text-sm font-medium">
          <h3>Private</h3>
        </header>

        <h3 className="text-lg font-medium">
          Keep Your Messages Confidential and Secure
        </h3>

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

      <article className="flex flex-col gap-4 border-x p-4">
        <header className="flex items-center justify-between text-sm font-medium">
          <h3>Encrypted</h3>
        </header>

        <h3 className="text-lg font-medium">
          Send Messages with Advanced Encryption Technology
        </h3>

        <p className="text-sm text-gray-500">
          We use state-of-the-art encryption technology to ensure the security of your
          messages. Send confidential information with peace of mind, knowing that your
          data is <span className="text-indigo-400">protected.</span>
        </p>

        <div className="flex h-56 w-full flex-col items-center justify-center rounded-lg bg-popover text-sm text-muted-foreground">
          Interactive animation
        </div>
      </article>

      <article className="flex flex-col gap-4 border p-4">Set a time</article>
    </div>
  );
};
