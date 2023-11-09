import { Product } from "@/lib/db/schema";
import { env } from "@/lib/env.mjs";
import { payments } from "@/lib/payments/lemon-squeezy";
import { User } from "next-auth";
import { redirect } from "next/navigation";

export const ChronoBucks = async ({
  user,
  product,
}: {
  user: User & { credits: number };
  product: Product;
}) => {
  const serverActionCheckout = async () => {
    "use server";

    const { data } = await payments.createCheckout({
      storeId: Number(env.STORE_ID),
      variantId: product.variantId,
      attributes: {
        product_options: {
          redirect_url: "https://wait4it.vercel.app/home",
        },
        checkout_data: {
          custom: {
            user_id: user.id,
            tokens: String(product.tokens),
            previous_tokens: String(user.credits),
          },
        },
      },
    });

    return redirect(data.attributes.url);
  };

  return (
    <form action={serverActionCheckout}>
      <button type="submit">Buy {product.name}</button>
    </form>
  );
};
