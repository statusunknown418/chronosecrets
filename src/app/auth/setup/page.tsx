import { SettingsForm } from "@/components/my/SettingsForm";
import { getFullUser } from "@/lib/auth/utils";
import { getRandomInt } from "@/lib/getBase64Blur";
import { redirect } from "next/navigation";

export default async function SetupNewUserPage() {
  const user = await getFullUser();

  if (!user) return redirect("/");

  const randomNumber = Math.floor(getRandomInt(10, 90)).toString();
  const generatedUsername = `${user.email
    .split("@")[0]
    .replaceAll(".", "-")}${randomNumber}`;

  return (
    <section className="flex h-full flex-col items-center justify-center">
      <div className="flex max-w-md flex-col gap-4 rounded-xl p-4">
        <h1 className="text-2xl font-bold">Quick account setup!</h1>

        <p className="mb-2 text-sm text-muted-foreground">
          We&apos;ve generated a username for you, but you can change it to whatever you
          want. You can also change your profile picture!
        </p>

        <SettingsForm
          user={{
            ...user,
            username: user.username || generatedUsername,
          }}
        />
      </div>
    </section>
  );
}
