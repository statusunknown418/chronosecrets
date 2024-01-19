import SignIn from "@/components/auth/SignIn";
import { MainContent } from "@/components/layout/MainContent";
import { Button, buttonVariants } from "@/components/ui/button";
import { EncodedCard } from "@/components/ui/encoded-card";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "@/components/ui/reveal-text";
import { SparklesCore } from "@/components/ui/sparkles";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="relative flex h-full flex-col items-center overflow-y-scroll">
      <div className="absolute inset-0 min-h-screen w-full">
        <SparklesCore
          id="ts-particles-full-page"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="h-full w-full"
          particleColor="#FFFFFF"
        />
      </div>

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

      <MainContent className="w-full">
        <HeroSection />

        <section
          id="features"
          className="flex w-full flex-col items-center bg-gradient-to-tr from-popover py-20"
        >
          <div className="flex max-w-4xl flex-col items-center gap-7">
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
          </div>
        </section>
      </MainContent>
    </section>
  );
}

const HeroSection = () => {
  return (
    <section id="hero" className="mt-20 flex w-full flex-col items-center gap-4">
      <header className="flex max-w-5xl flex-col items-center gap-4">
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
      <div className="flex h-[300px] w-full items-center justify-center sm:h-[400px] md:h-[500px]"></div>
    </section>
  );
};

const FeatureListAutoAccordion = () => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-5">
      <article className="flex flex-col gap-5 md:flex-row">
        <EncodedCard text="👀" className="h-72 w-max rounded-3xl border" />

        <div className="flex flex-col gap-4 rounded-xl border bg-[#1d1c20] p-4">
          <header className="flex items-center justify-between text-sm font-medium text-[#a9a9a9]">
            <h3>Private</h3>
          </header>

          <h3 className="text-lg font-bold">
            Keep Your Messages Confidential and Secure
          </h3>

          <p className="text-sm text-[#a9a9a9]">
            ChronoSecrets allows you to schedule and send encrypted messages that can only
            be revealed at a certain time and seen only by the person{" "}
            <span className="text-indigo-400">you choose</span>. Take control of your
            messages and ensure their privacy.
          </p>
        </div>
      </article>

      <article className="flex w-full gap-5">
        <TextRevealCard text="Hidden message" revealText="The actual message">
          <header className="mb-2 flex items-center justify-between text-sm font-medium text-[#a9a9a9]">
            <h3>Secure</h3>
          </header>
          <TextRevealCardTitle className="font-bold">Okay, but how?</TextRevealCardTitle>
          <TextRevealCardDescription>
            We use state-of-the-art encryption technology to ensure the security of your
            messages. Send confidential information with peace of mind, knowing that your
            data is <span className="text-indigo-400">protected.</span>
          </TextRevealCardDescription>
        </TextRevealCard>

        <div className="aspect-square w-80 rounded-xl border" />
      </article>

      {/* <article className="flex flex-col gap-5 md:flex-row">
        <EncodedCard text="👀" className="h-72 w-max rounded-3xl border" />

        <div className="flex flex-col gap-4 rounded-xl border bg-[#1d1c20] p-4">
          <header className="flex items-center justify-between text-sm font-medium text-[#a9a9a9]">
            <h3>Private</h3>
          </header>

          <h3 className="text-lg font-bold">
            Select an adequate time for your message to be revealed
          </h3>

          <p className="text-sm text-[#a9a9a9]">
            ChronoSecrets allows you to schedule and send encrypted messages that can only
            be revealed at a certain time and seen only by the person{" "}
            <span className="text-indigo-400">you choose</span>. Take control of your
            messages and ensure their privacy.
          </p>
        </div>
      </article> */}
    </div>
  );
};
