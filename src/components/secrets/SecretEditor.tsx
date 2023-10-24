"use client";
import { useRouter } from "next/navigation";
import SecretForm from "./SecretForm";

const SecretEditor = () => {
  const router = useRouter();

  return <SecretForm closeModal={() => router.push("/home")} />;
};

export default SecretEditor;
