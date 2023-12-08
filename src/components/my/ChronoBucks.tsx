import { APP_URL } from "@/lib/constants";
import { Product } from "@/lib/db/schema";
import { env } from "@/lib/env.mjs";
import { payments } from "@/lib/payments/lemon-squeezy";
import { cn } from "@/lib/utils";
import { ShoppingCart, Star } from "lucide-react";
import { User } from "next-auth";
import { redirect } from "next/navigation";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

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
          redirect_url: `${APP_URL}/my/settings?tab=chronoBucks&cheers=1`,
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
    <form
      action={serverActionCheckout}
      className={cn(
        "relative grid grid-cols-1 gap-4 rounded-xl border p-5",
        product.tokens < 200 && "",
        product.tokens === 200 && "",
        product.tokens >= 500 && "border-dashed border-indigo-800",
      )}
    >
      {product.tokens === 500 && (
        <Badge className="absolute -left-3 -top-3 w-max bg-indigo-600 text-indigo-100 hover:bg-indigo-500">
          <Star size={12} className="fill-indigo-200" />
          <span>Best value</span>
        </Badge>
      )}

      <section className="flex flex-col items-center justify-center">
        <p className="text-sm font-medium text-muted-foreground">
          ${product.price / 100}
        </p>
        <h3 className="text-center font-mono text-2xl font-light">{product.name}CB</h3>
        <p className="text-sm text-muted-foreground">ChronoBucks</p>

        <Button
          type="submit"
          variant={product.tokens === 500 ? "default" : "primary"}
          size="sm"
          rounding="full"
          className="mt-5"
        >
          <ShoppingCart size={16} />
          Buy now
        </Button>
      </section>
    </form>
  );
};
