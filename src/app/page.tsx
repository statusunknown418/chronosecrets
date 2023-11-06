import SignIn from "@/components/auth/SignIn";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-6 p-5">
      <header className="flex flex-col gap-3 text-center">
        <h1 className="text-3xl font-bold">Hey, wanna share some stuff?</h1>
        <p className="text-gray-500">
          This a new social network that makes it easy and fun
        </p>
      </header>

      <SignIn callbackUrl="/home" />
    </main>
  );
}
