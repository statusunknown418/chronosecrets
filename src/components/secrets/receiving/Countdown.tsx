"use client";
import { Secret } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { formatDistance } from "date-fns";
import { ArrowRight, Dot } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Countdown = ({ secret }: { secret: Secret }) => {
  const [timeLeft, setTimeLeft] = useState(
    formatDistance(secret.revealingDate, new Date(), {
      addSuffix: true,
      includeSeconds: true,
    }),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (secret.revealingDate < new Date()) {
        clearInterval(interval);
      } else {
        setTimeLeft(
          formatDistance(secret.revealingDate || new Date(), new Date(), {
            addSuffix: true,
            includeSeconds: true,
          }),
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [secret.revealingDate]);

  return (
    <div className={cn("rounded-b-2xl border-t py-3 font-medium text-neutral-100")}>
      {secret.revealed && secret.revealingDate < new Date() ? (
        <Link href={`/inbox/${secret.id}`}>
          <p className="group flex items-center justify-center gap-1">
            <Dot size={24} className="animate-ping text-green-500" />

            <span>Available Now!</span>

            <ArrowRight
              size={16}
              className="text-green-400 duration-200 group-hover:translate-x-1"
            />
          </p>
        </Link>
      ) : (
        <span className="text-muted-foreground">Revealing {timeLeft}</span>
      )}
    </div>
  );
};
