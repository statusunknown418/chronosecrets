import SportList from "@/components/sports/SportList";
import NewSportModal from "@/components/sports/SportModal";
import { getSports } from "@/lib/api/sports/queries";

export default async function Sports() {
  const t1 = Date.now();
  const { sports } = await getSports();
  const t2 = Date.now();

  return (
    <main className="max-w-3xl mx-auto p-5 md:p-0 sm:pt-4">
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Sports</h1>
        <p>Took: {t2 - t1}</p>
        <NewSportModal />
      </div>
      <SportList sports={sports} />
    </main>
  );
}
