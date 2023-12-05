import { MainContent } from "@/components/layout/MainContent";
import SecretForm from "@/components/secrets/SecretForm";
import { BypassingBanner } from "@/components/secrets/edit/BypassingBanner";
import { Suspense } from "react";

export const metadata = {
  title: "New",
};

export default function NewSecretPage() {
  return (
    <MainContent>
      <Suspense>
        <BypassingBanner />
      </Suspense>

      <section className="w-full">
        <Suspense>
          <SecretForm />
        </Suspense>
      </section>
    </MainContent>
  );
}
