"use client";
import { animated, useSpring } from "@react-spring/web";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export const MyChronoBucks = ({ bucks }: { bucks: number }) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: bucks,
    delay: 100,
    config: { mass: 2, tension: 40, friction: 20 },
  });

  const showCheers = useSearchParams().get("cheers");

  showCheers &&
    toast.success("Amazing!", {
      description: "We added the ChronoBucks to your account!",
    });

  return (
    <h3 className="text-3xl">
      $<animated.span>{number.to((n) => n.toFixed(2))}</animated.span>CB
    </h3>
  );
};
