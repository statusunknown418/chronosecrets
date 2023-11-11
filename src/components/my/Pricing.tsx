import { getProducts } from "@/lib/api/products/queries";
import { getFullUser } from "@/lib/auth/utils";
import { redirect } from "next/navigation";
import { ChronoBucks } from "./ChronoBucks";
import { MyChronoBucks } from "./MyChronoBucks";

export const Pricing = async () => {
  const [products, session] = await Promise.all([getProducts(), getFullUser()]);

  if (!session?.id) return redirect("/auth/signin");

  return (
    <section className="mx-2 flex flex-col gap-4">
      <article className="flex flex-col gap-3 rounded-lg border p-4">
        <p className="text-sm font-light text-muted-foreground">Your ChronoBucks</p>

        <MyChronoBucks bucks={session.credits} />

        <p className="text-sm font-light text-muted-foreground">
          This is the in-app currency used to access & unlock special features!
        </p>
      </article>

      <h4 className="text-xl font-bold">I want more!</h4>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ChronoBucks product={p} user={session} key={p.id} />
        ))}
      </div>

      <p className="text-sm font-light text-muted-foreground">
        Your ChronoBucks will be added to your account immediately after purchase!
      </p>
    </section>
  );
};
