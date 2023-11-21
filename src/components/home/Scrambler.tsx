"use client";
import { useScramble } from "use-scramble";

export const Scrambler = ({ text }: { text: string }) => {
  const { ref, replay } = useScramble({
    text,
    overdrive: false,
  });

  return (
    <p
      ref={ref}
      onMouseEnter={replay}
      className="max-h-[100px] min-h-[80px] min-w-[26ch] max-w-full overflow-hidden text-ellipsis break-words text-sm font-light text-muted-foreground sm:w-max"
    />
  );
};
