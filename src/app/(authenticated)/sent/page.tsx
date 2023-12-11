import { HomeTabs } from "@/components/home/HomeTabs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return <HomeTabs />;
}
