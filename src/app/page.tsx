import SignIn from "@/components/auth/SignIn";
import { MainContent } from "@/components/layout/MainContent";
import { Button, buttonVariants } from "@/components/ui/button";
import { SparklesCore } from "@/components/ui/sparkles";
import { WavyBackground } from "@/components/ui/wavy-background";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FeatureListAutoAccordion } from "./(authenticated)/home/_ui/FeatureList";

export default function Home() {
  return (
    <section className="relative flex h-full flex-col items-center overflow-y-scroll bg-black">
      <nav className="sticky top-3 z-20 mt-3 flex max-w-2xl items-center gap-5 rounded-full border bg-popover/70 p-2 text-sm text-popover-foreground backdrop-blur backdrop-filter">
        <Button variant="ghost" rounding="full" size="sm">
          <Image src="/favicon.ico" width={28} height={28} alt="logo" />
          <span className="font-semibold text-foreground">ChronoSecrets</span>
        </Button>

        <nav className="hidden flex-grow items-center gap-4 sm:flex">
          <Link href={"#features"}>
            <Button variant="ghost" rounding="full" size="sm">
              Features
            </Button>
          </Link>

          <Link href={"#scheduling"}>
            <Button variant="ghost" rounding="full" size="sm">
              Scheduling
            </Button>
          </Link>
        </nav>

        <SignIn callbackUrl="/home" />
      </nav>

      <MainContent className="w-full gap-0">
        <HeroSection />

        <div className="h-0.5 w-full rounded-full bg-popover" />

        <section
          id="features"
          className="flex w-full flex-col items-center bg-gradient-to-br from-popover px-4 py-32 text-center"
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
        <div className="h-0.5 w-full rounded-full bg-popover" />

        <section className="mt-10 border-b-2 px-4 py-20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.15)] backdrop-blur">
          <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
            <div className="mx-auto max-w-md text-center sm:max-w-xl">
              <h2 className="font-display bg-gradient-to-r from-gray-200 via-indigo-400 to-gray-200 bg-clip-text text-4xl font-extrabold leading-tight text-transparent sm:text-5xl sm:leading-tight">
                Proudly open-source
              </h2>
              <p className="text-gray-[#a9a9a9] mt-5 sm:text-lg">
                Our source code is available on GitHub - feel free to read, see the
                technologies used, review, or contribute to it however you want!
              </p>
            </div>
            <div className="flex items-center justify-center py-10">
              <Link
                href="https://github.com/statusunknown418/chronosecrets"
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex items-center">
                  <div className="h-0.50 flex items-center space-x-2 rounded-lg border border-gray-600 bg-popover px-4 py-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-white"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                    </svg>
                    <p className="text-sm font-medium text-white">Star ⭐️</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="relative flex w-full flex-col items-start justify-center gap-10 self-center px-5 py-20 text-center">
          <SparklesCore
            className="absolute inset-0 h-96 w-full"
            background="transparent"
            particleSize={5}
            maxSize={1.4}
          />

          <div className="flex w-full flex-col items-center justify-center gap-5 text-center">
            <h2 className="text-2xl font-extrabold md:text-3xl">
              What are you waiting for?
            </h2>
            <p className="text-[#a9a9a9]">Start sending encrypted messages today!</p>
          </div>

          <Link
            href={"/home"}
            className="group relative inline-flex h-10 items-center justify-center self-center overflow-hidden rounded-full bg-indigo-600 px-6 font-medium text-neutral-200 duration-500"
          >
            <div className="translate-x-0 opacity-100 transition group-hover:-translate-x-[150%] group-hover:opacity-0">
              Start now!
            </div>

            <div className="absolute translate-x-[150%] opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
              >
                <path
                  d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </Link>
        </section>
      </MainContent>

      <footer className="flex flex-col items-center justify-center gap-4 px-4 py-10">
        <p className="text-center text-sm text-gray-500">
          Powered by <span className="text-indigo-400">Meow Studios</span> and Made with{" "}
          <span role="img" aria-label="love">
            ❤️
          </span>{" "}
          by{" "}
          <Link href="https://x.com/alvaro_dotdev" className="text-indigo-400">
            @alvaro_dotdev
          </Link>{" "}
          and designed{" "}
          <span role="img" aria-label="love">
            🖼️
          </span>{" "}
          by{" "}
          <Link
            href="https://www.instagram.com/francisco19_03/"
            className="text-indigo-400"
          >
            @francisco19_03
          </Link>
        </p>
      </footer>
    </section>
  );
}

const HeroSection = () => {
  return (
    <WavyBackground className="mx-auto max-w-4xl" waveWidth={120} speed="slow" blur={8}>
      <section
        id="hero"
        className="z-10 mt-20 flex w-full flex-col items-center justify-center gap-10"
      >
        <header className="flex h-full max-w-5xl flex-col items-center justify-center gap-10">
          <h1 className="text-center text-4xl font-black md:text-5xl lg:text-6xl">
            Schedule and Send Encrypted Messages with Ease
          </h1>

          <section className="flex flex-col gap-4">
            <p className="text-center text-gray-200 md:text-lg">
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

              <Link
                href={"#features"}
                className={buttonVariants({ rounding: "full", variant: "outline" })}
              >
                Learn more
              </Link>
            </div>
          </section>
        </header>
        <div className="flex h-[400px] w-full items-center justify-center"></div>
      </section>
    </WavyBackground>
  );
};

