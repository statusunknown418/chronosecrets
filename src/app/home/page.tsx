import { SignOut } from "@/components/auth/SignOut";
import { getUserAuth } from "@/lib/auth/utils";

export default async function HomePage() {
  const user = await getUserAuth();

  return (
    <main>
      <h1 className="text-2xl font-bold">Welcome back {user.session?.user.name}</h1>

      <SignOut />
    </main>
  );
}
