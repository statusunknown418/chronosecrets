"use client";
import { CompleteSport } from "@/lib/db/schema/sports";
import { trpc } from "@/lib/trpc/client";
import SportModal from "./SportModal";

export default function SportList({ sports }: { sports: CompleteSport[] }) {
  const { data: s } = trpc.sports.getSports.useQuery(undefined, {
    initialData: { sports },
    refetchOnMount: false,
  });

  if (s.sports.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {s.sports.map((sport) => (
        <Sport sport={sport} key={sport.id} />
      ))}
    </ul>
  );
}

const Sport = ({ sport }: { sport: CompleteSport }) => {
  return (
    <li className="my-2 flex justify-between">
      <div className="w-full">
        <div>{sport.title}</div>
      </div>
      <SportModal sport={sport} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No sports</h3>
      <p className="mt-1 text-sm text-gray-500">Get started by creating a new sport.</p>
      <div className="mt-6">
        <SportModal emptyState={true} />
      </div>
    </div>
  );
};
