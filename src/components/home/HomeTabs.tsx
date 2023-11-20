import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListWrapper } from "../secrets/ListWrapper";
import { RevealingListWrapper } from "../secrets/sent/RevealingListWrapper";

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
        <ListWrapper />
      </TabsContent>

      <TabsContent value="delivered">
        <RevealingListWrapper />
      </TabsContent>
    </Tabs>
  );
};
