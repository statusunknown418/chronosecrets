import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import { MySecretsList } from "../secrets/secrets-list";
import { DeliveredListWrapper } from "../secrets/sent/DeliveredListWrapper";
import { Skeleton } from "../ui/skeleton";

export const HomeTabs = () => {
  return (
    <Tabs defaultValue={"scheduled"} className="pb-14 md:pb-0">
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
            <section className="max-w-full pt-2">
              <ul className="grid h-full grid-cols-1 gap-4 md:grid-cols-2">
                {[1, 2, 3, 4, 5, 6].map((s) => (
                  <Skeleton key={s} className="h-64 w-full" />
                ))}
              </ul>
            </section>
          }
        >
          <MySecretsList />
        </Suspense>
      </TabsContent>

      <TabsContent value="delivered">
        <DeliveredListWrapper />
      </TabsContent>
    </Tabs>
  );
};
