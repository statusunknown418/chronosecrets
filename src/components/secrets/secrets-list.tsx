import { getSecrets } from "@/lib/api/secrets/queries";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "../ui/button";
import { ListWrapper } from "./ListWrapper";
import { ShareCustomLink } from "./QuickShare";

export const MySecretsList = async () => {
  const data = await getSecrets();

  if (data.secrets.length === 0) {
    return <EmptySecretState />;
  }

  return (
    <Suspense>
      <ListWrapper initialData={data} />
    </Suspense>
  );
};

export const EmptyInboxState = async () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 rounded-lg border p-4 text-sm text-slate-500">
      <p>No one has scheduled any secrets for you yet. 😢</p>

      <ShareCustomLink />
    </div>
  );
};

export const EmptySecretState = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 rounded-lg border p-4 text-sm text-slate-500">
      <p>You have no secrets yet.</p>

      <Link href="/secrets/new" className="focus-within:outline-none">
        <Button variant={"link"} icon={<Plus size={16} />}>
          <Plus size={16} />
          <span>Add secret</span>
        </Button>
      </Link>
    </div>
  );
};
