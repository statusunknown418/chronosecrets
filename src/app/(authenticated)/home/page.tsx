import { SearchSecrets } from "@/components/secrets/SearchSecrets";
import { Spinner } from "@/components/ui/spinner";
import { Metadata } from "next";
import { Suspense } from "react";
import { MySecretsList } from "../../../components/secrets/MySecretsList";

export const metadata: Metadata = {
  title: "Home",
};

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { search: string };
}) {
  return (
    <main className="flex w-full flex-col">
      <header className="sticky inset-0 flex flex-col gap-4 border-b bg-background/40 p-4 backdrop-blur backdrop-filter">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Secrets created by you
        </h1>

        <SearchSecrets />
      </header>

      <div className="h-full p-4">
        <Suspense
          fallback={
            <div className="flex h-full items-center justify-center">
              <Spinner />
            </div>
          }
        >
          <MySecretsList query={searchParams?.search} />
        </Suspense>
      </div>
    </main>
  );
}
