import { db } from "@/lib/db";

export const getProducts = async () => {
  return db.query.products.findMany();
};

export const baseProducts = [
  {
    id: 1,
    name: "50 ChronoBucks",
    description: "Gotta sync this from lemonsqueezy",
    productId: 128277,
    variantId: 149165,
    price: 299,
    tokens: 50,
  },
  {
    id: 2,
    name: "200 ChronoBucks",
    description: "Again needs sync",
    productId: 128278,
    variantId: 149530,
    price: 699,
    tokens: 200,
  },
  {
    id: 3,
    name: "500 ChronoBucks",
    description: "Special tokens taken far",
    productId: 128279,
    variantId: 149167,
    price: 1099,
    tokens: 500,
  },
] as const;
