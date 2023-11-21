import { randomBytes } from "crypto";
import { getPlaiceholder } from "plaiceholder";
import { toast } from "sonner";

export const getBase64Blur = async (src: string) => {
  try {
    const res = await fetch(src);

    if (!res.ok) throw new Error(`Network response was not ok - ${res.statusText}`);

    const buffer = await res.arrayBuffer();

    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    return base64;
  } catch (error) {
    if (error instanceof Error) toast.error(error.message);
  }
};

export const getRandomInt = (min: number, max: number): number => {
  const randomBuffer = randomBytes(4);

  const randomInt = randomBuffer.readUInt32BE(0); // Convert bytes to an unsigned 32-bit integer

  return min + (randomInt % (max - min + 1));
};
