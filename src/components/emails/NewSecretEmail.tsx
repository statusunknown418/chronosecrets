import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";

import { FunctionComponent } from "react";

export type NewSecretEmailProps = {
  receiverName: string;
  receiverEmail: string;
  receiverUsername: string;
  secretId: string;
  secretTitle: string;
};

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";

export const NewSecretEmail: FunctionComponent<NewSecretEmailProps> = ({
  receiverName,
  secretId,
  secretTitle,
  receiverEmail,
  receiverUsername,
}) => {
  const fullSecretUrl = `${baseUrl}/receiving/${secretId}`;

  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>Hey, there&apos;s something new for you 🤫!</Preview>

        <Body className="mx-auto my-auto font-sans">
          <Container className="rounded-lg border border-gray-500 p-5">
            <Heading className="text-3xl font-bold">
              Someone just created a secret for you!
            </Heading>

            <Text>
              Hi, <span>{receiverName}!</span> You have just been selected as the receiver
              of a new secret. Click the button below to check it out!
            </Text>

            <Text className="text-xl">
              Secret Title: <strong className="capitalize">{secretTitle}</strong>
            </Text>

            <Button
              className="rounded-full border border-indigo-500 px-5 py-3 text-white"
              href={fullSecretUrl}
            >
              I wanna see it!
            </Button>

            <Text>
              Or, if you want, you can also copy and paste the link below into your
              browser:
            </Text>

            <Link className="text-center text-lg underline" href={fullSecretUrl}>
              {fullSecretUrl}
            </Link>

            <Hr className="mt-5" />

            <Text className="text-sm text-gray-500">
              This email was intended for{" "}
              <strong className="text-black">{receiverUsername}</strong> - registered as{" "}
              {receiverEmail}. If you received this email by mistake, please reach out to
              us{" "}
              <Link href="mailto:alvarodevcode@outlook.com" className="underline">
                here
              </Link>{" "}
              or if you prefer, just ignore this message.
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};
