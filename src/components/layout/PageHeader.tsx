import { X } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "../ui/button";

export const PageHeader = ({
  back = false,
  title,
  extra,
}: {
  title: string;
  back?: boolean;
  extra?: ReactNode;
}) => {
  return (
    <section className="sticky inset-0 z-10 flex w-full flex-col gap-2 border-b bg-background/20 px-4 py-2 backdrop-blur backdrop-filter sm:py-4">
      {extra && extra}

      <header className="flex h-10 w-full items-center justify-between gap-4">
        <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>

        {back && (
          <Link href="/home" className="focus-within:outline-none">
            <Button variant="ghost" size="icon">
              <X size={20} className="text-muted-foreground" />
            </Button>
          </Link>
        )}
      </header>
    </section>
  );
};
