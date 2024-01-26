"use client";
import { EncodedCard } from "@/components/ui/encoded-card";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "@/components/ui/reveal-text";
import { useWindowSize } from "@/lib/hooks/useWindowSize";
import Image from "next/image";

export const FeatureListAutoAccordion = () => {
  const isMobile = useWindowSize().width < 768;

  return (
    <div className="mt-6 grid grid-cols-1 gap-5 text-left">
      <article className="flex flex-col gap-5 md:flex-row">
        {!isMobile && (
          <EncodedCard
            text="👀"
            className="h-72 w-max rounded-3xl border bg-black md:block"
          />
        )}

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
        {!isMobile && (
          <EncodedCard
            text="💀"
            className="h-72 w-max rounded-3xl border bg-black md:block"
          />
        )}
      </article>

      <article className="flex flex-col gap-5 md:flex-row" id="scheduling">
        {!isMobile && (
          <div className="relative aspect-square h-80 rounded-lg border bg-background">
            <Image
              src="/assets/scheduling.png"
              alt="Scheduling"
              layout="fill"
              className="overflow-hidden rounded-lg object-contain"
            />
          </div>
        )}

        <div className="flex flex-col gap-4 rounded-xl border bg-[#1d1c20] p-4">
          <header className="flex items-center justify-between text-sm font-medium text-[#a9a9a9]">
            <h3>Private</h3>
          </header>

          <h3 className="text-lg font-bold">
            Select an adequate date{" "}
            <span className="italic underline underline-offset-2">(and time!)</span> for
            your message to be revealed
          </h3>

          <div className="text-sm text-[#a9a9a9]">
            ChronoSecrets allows you to precisely select the date and time for your
            message to be revealed.
            <hr className="my-3" />
            <ul className="list-disc">
              <li className="ml-4 list-item italic">
                What if I got it wrong 😢? Don&apos;t worry, you can always edit it
                later!.
              </li>
              <li className="ml-4 list-item italic">
                What if I want to send a message to someone in the future 🤫? You can do
                that too!
              </li>
            </ul>
          </div>
        </div>
      </article>
    </div>
  );
};
