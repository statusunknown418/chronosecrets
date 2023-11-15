import SignIn from "@/components/auth/SignIn";
import { ErrorState } from "@/components/secrets/ErrorState";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  buildFullShareableUrl,
  getSecretByShareableUrl,
} from "@/lib/api/secrets/queries";
import { getUserAuth } from "@/lib/auth/utils";
import { format } from "date-fns";
import { Ban, Info, X } from "lucide-react";
import Link from "next/link";

export default async function ShareableUrlPage({
  params: { shareableUrl },
  searchParams: { wasEditing },
}: {
  params: {
    shareableUrl: string;
  };
  searchParams: {
    wasEditing?: string;
  };
}) {
  const fullUrl = buildFullShareableUrl(shareableUrl);
  const { shared } = await getSecretByShareableUrl(fullUrl);
  const { session } = await getUserAuth();

  if (!shared) {
    return (
      <main className="flex h-full flex-col items-center justify-center gap-4 px-4">
        <Ban size={32} className="text-indigo-500" />

        <h1 className="text-center text-2xl font-bold">Shared secret not found</h1>

        <Link href={"/home"} passHref>
          <Button variant="link">Go back home</Button>
        </Link>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
        <section className="flex flex-col gap-4 rounded-3xl border border-dashed p-6 sm:p-8 md:p-10">
          <span className="self-start rounded-full border border-red-700 bg-red-950 px-3 py-1 text-xs font-medium text-red-300">
            Heads up
          </span>

          <h2 className="text-3xl font-bold">You need to be logged in!</h2>
          <p className="text-sm text-muted-foreground">
            You&apos;re trying to access a secret via a shared URL, please click the
            button below and we&apos;ll make sure you&apos;re redirected back here
          </p>

          <SignIn label="Ok, Sign me in!" />
        </section>
      </div>
    );
  }

  const receiversIds = shared.receivers.map((receiver) => receiver.userId);
  const viewerId = session.user.id;

  if (shared.createdByUserId !== viewerId && !receiversIds.includes(viewerId)) {
    return (
      <ErrorState
        error={{
          code: "UNAUTHORIZED",
          message: "You are not authorized to view this secret",
          name: "Unauthorized",
        }}
      />
    );
  }

  return (
    <main className="flex flex-col gap-4">
      <header className="sticky inset-0 z-10 flex flex-col gap-2 border-b bg-background/20 px-4 py-3 backdrop-blur backdrop-filter">
        <span className="w-max rounded-full border border-indigo-800 bg-indigo-950 px-4 py-1 text-xs text-indigo-500">
          Shared
        </span>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold capitalize">{shared.title}</h1>

          <Link href={wasEditing ? `/home?tab=delivered` : `/receiving`}>
            <Button variant="ghost" size="icon">
              <X size={20} className="text-muted-foreground" />
            </Button>
          </Link>
        </div>
      </header>

      <div className="flex flex-col gap-4 px-4">
        <div className="text-muted-foreground">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger className="flex items-center gap-1 text-indigo-500">
                <span className="text-muted-foreground">From</span>
                {shared.creator.username} <Info size={16} />
              </TooltipTrigger>

              <TooltipContent className="text-sm" side="bottom">
                Made by <span className="text-foreground">{shared.creator.name}</span> at{" "}
                {format(shared.createdAt || new Date(), "PPpp")}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Textarea
          className="min-h-[200px] cursor-pointer resize-none sm:min-h-[140px]"
          value={shared.content}
          readOnly
        />
      </div>

      <footer className="sticky inset-x-0 bottom-0 z-10 flex items-center justify-between gap-4 border-t bg-background/20 px-4 py-3 backdrop-blur backdrop-filter">
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <span className="font-semibold underline underline-offset-2">
            {shared.receivers.length}{" "}
            {shared.receivers.length === 1 ? "receiver" : "receivers"}
          </span>
          <span>can see this secret</span>
        </p>
      </footer>
    </main>
  );
}
