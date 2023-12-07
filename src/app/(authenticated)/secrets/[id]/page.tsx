import { QuickShare } from "@/components/secrets/QuickShare";
import { EditMenu } from "@/components/secrets/edit/EditMenu";
import { Button } from "@/components/ui/button";
import { getSecretById } from "@/lib/api/secrets/queries";
import { getFullUser } from "@/lib/auth/utils";
import { Cable, Eye, HelpCircle, X } from "lucide-react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";

export type SecretSlugPageProps = {
  params: {
    id: string;
    editing?: string;
  };
};

export const generateMetadata = async ({
  params,
}: SecretSlugPageProps): Promise<Metadata> => {
  return {
    title: `Editing #${params.id}`,
  };
};

const DynamicSecretForm = dynamic(() => import("@/components/secrets/SecretForm"));

export default async function SecretSlugPage({ params: { id } }: SecretSlugPageProps) {
  const [user, { secret }] = await Promise.all([
    getFullUser(),
    getSecretById(Number(id)),
  ]);

  if (!secret) {
    return (
      <main className="flex h-full flex-col items-center justify-center gap-4 px-4">
        <Cable size={32} className="text-indigo-400" />

        <h1 className="text-center text-2xl font-bold">Secret not found 😭</h1>

        <Link href={"/home"} passHref>
          <Button variant="link">Go back home</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-4">
      <section className="sticky inset-0 z-10 flex flex-col gap-2 border-b bg-background/20 px-4 pb-2 pt-4 backdrop-blur backdrop-filter">
        <div className="flex items-center justify-between">
          <span className="flex h-7 w-max items-center justify-center rounded-full border border-blue-800 bg-blue-950 px-4 text-xs text-blue-500">
            Editing
          </span>

          <Link href="/my/settings?tab=chronoBucks">
            <Button
              size="xs"
              variant="outline"
              rounding="full"
              className="rounded-full border border-indigo-500 px-2 py-1 text-xs text-indigo-400 sm:hidden"
            >
              <span className="font-bold">{user?.credits} CBs</span> left{" "}
              <HelpCircle size={16} />
            </Button>
          </Link>
        </div>

        <header className="items-ce flex w-full justify-between gap-2 sm:items-center sm:gap-5">
          <div className="flex items-center gap-1 sm:gap-2">
            <h1 className="break-words text-2xl font-bold capitalize">{secret.title}</h1>

            <div className="hidden sm:flex sm:items-center">
              <QuickShare url={secret.shareableUrl} />

              <Link href={`${secret.shareableUrl}?wasEditing=true`} passHref>
                <Button variant={"ghost"} size={"icon"}>
                  <Eye size={20} className="text-muted-foreground" />
                </Button>
              </Link>
            </div>
          </div>

          <Link href="/home" className="hidden focus-within:outline-none sm:flex">
            <Button variant="ghost" size="icon">
              <X size={20} className="text-muted-foreground" />
            </Button>
          </Link>

          <div className="sm:hidden">
            <EditMenu secret={secret} />
          </div>
        </header>
      </section>

      <section className="px-4">
        <Suspense>
          <DynamicSecretForm secret={secret} />
        </Suspense>
      </section>
    </main>
  );
}
