import { RevealedSecretsList } from "@/components/secrets/sent/RevealedSecretsList";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";
import { Suspense } from "react";
import { MySecretsList } from "../../../components/secrets/MySecretsList";

export const metadata: Metadata = {
  title: "Home",
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  return (
    <Tabs defaultValue={searchParams.tab || "scheduled"}>
      <TabsList className="w-full sm:w-max">
        <TabsTrigger value="scheduled" className="w-full sm:w-max">
          Scheduled
        </TabsTrigger>
        <TabsTrigger value="delivered" className="w-full sm:w-max">
          Delivered
        </TabsTrigger>
      </TabsList>

      <TabsContent value="scheduled">
        <Suspense
          fallback={
            <div className="flex h-full items-center justify-center">
              <Spinner />
            </div>
          }
        >
          <MySecretsList />
        </Suspense>
      </TabsContent>

      <TabsContent value="delivered">
        <Suspense
          fallback={
            <div className="flex h-full items-center justify-center">
              <Spinner />
            </div>
          }
        >
          <RevealedSecretsList />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}
