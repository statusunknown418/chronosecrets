"use client";
import { useRouter } from "next/navigation";
import SecretForm from "./SecretForm";

const SecretEditor = () => {
  const router = useRouter();

  return <SecretForm closeModal={router.back} />;
};

export default SecretEditor;
