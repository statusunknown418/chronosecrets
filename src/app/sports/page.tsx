import SportList from "@/components/sports/SportList";
import NewSportModal from "@/components/sports/SportModal";
import { getSecrets } from "@/lib/api/secrets/queries";
import { getSports } from "@/lib/api/sports/queries";

export default async function Sports() {
  const t1 = Date.now();
  const { sports } = await getSports();
  const { secrets } = await getSecrets();
  const t2 = Date.now();

  return (
    <main className="mx-auto max-w-3xl p-5 sm:pt-4 md:p-0">
      <div className="flex justify-between">
        <h1 className="my-2 text-2xl font-semibold">Sports</h1>
        <p>Took: {t2 - t1}</p>
        <NewSportModal />
      </div>
      <SportList sports={sports} />

      {JSON.stringify({ secrets })}
    </main>
  );
}
