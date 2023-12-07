import { SigninWithProvider } from "@/components/auth/SignInWithProvider";
import Image from "next/image";
import { Suspense } from "react";

const providers = [
  {
    provider: "discord",
    icon: (
      <Image
        src="/assets/discord.png"
        width={20}
        height={20}
        alt="discord"
        className="transition-all duration-300 group-hover:rotate-[360deg]"
      />
    ),
  },
  {
    provider: "google",
    icon: (
      <Image
        src="/assets/google.png"
        width={20}
        height={20}
        alt="google"
        className="transition-all duration-300 group-hover:rotate-[360deg]"
      />
    ),
  },
];

export default function SignInPage({
  searchParams: { error },
}: {
  searchParams: { error?: string };
}) {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-4 p-2">
      <section className="flex w-full max-w-md flex-col overflow-hidden rounded-lg border shadow-xl shadow-black sm:p-8 md:p-10">
        {error && (
          <div className="rounded-md border bg-red-800 p-2 text-sm text-destructive-foreground">
            Something happened {error}
          </div>
        )}

        <header className="flex flex-col items-center gap-4 px-5 py-5">
          <Image
            src="/favicon.ico"
            width={52}
            height={52}
            alt="logo"
            className="transition-all duration-300"
          />

          <h1 className="text-center text-2xl font-extrabold tracking-wide">
            Sign in to ChronoSecrets
          </h1>

          <p className="text-center text-sm text-muted-foreground">
            Schedule and share encrypted secrets with your friends!
          </p>
        </header>

        <hr className="bg-border" />

        <article className="flex flex-col gap-3 px-5 py-6">
          <Suspense>
            {providers.map((p) => (
              <SigninWithProvider key={p.provider} provider={p.provider} icon={p.icon} />
            ))}
          </Suspense>

          <footer className="mt-2 text-center text-xs text-muted-foreground">
            Yeah we chose to only support social providers for a smooth and easy
            onboarding
          </footer>
        </article>
      </section>
    </main>
  );
}
