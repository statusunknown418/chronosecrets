import { SigninWithProvider } from "@/components/auth/SignInWithProvider";
import Image from "next/image";

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
      <section className="flex w-full max-w-md flex-col gap-6 rounded-lg border bg-muted p-5 sm:p-8 md:p-10">
        {error && (
          <div className="rounded-md border bg-red-800 p-2 text-sm text-destructive-foreground">
            Something happened {error}
          </div>
        )}

        <header className="flex flex-col gap-4">
          <h2>LOGO</h2>

          <h1 className="text-2xl font-extrabold tracking-wide">
            Sign In to ChronoSecrets
          </h1>
          <p className="text-sm text-muted-foreground">
            Schedule and share encrypted secrets with your friends
          </p>
        </header>

        <hr className="bg-border" />

        <article className="flex flex-col gap-3">
          {providers.map((p) => (
            <SigninWithProvider key={p.provider} provider={p.provider} icon={p.icon} />
          ))}
        </article>

        <footer className="text-center text-xs text-muted-foreground">
          Yeah we chose to only support social providers for a smooth and easy onboarding
        </footer>
      </section>
    </main>
  );
}
