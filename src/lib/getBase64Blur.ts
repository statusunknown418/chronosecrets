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
