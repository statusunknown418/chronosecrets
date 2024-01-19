"use client";

import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GoogleGeminiEffect } from "../ui/google-gemini";

export const GeminiWrapper = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <section id="hero" ref={ref} className="h-[400vh] w-full overflow-clip">
      <GoogleGeminiEffect
        title="Schedule and Send Encrypted Messages with Ease"
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
        description="This a new social network that makes it easy and fun"
      />
    </section>
  );
};
