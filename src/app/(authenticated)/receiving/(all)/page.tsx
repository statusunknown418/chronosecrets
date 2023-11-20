import { ReceivingListWrapper } from "@/components/secrets/receiving/ReceivingListWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sent to Me",
};

export default function ReceivingSecretsPage() {
  return (
    <section className="h-full w-full pb-16">
      <ReceivingListWrapper />
    </section>
  );
}
