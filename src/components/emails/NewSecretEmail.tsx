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
  Section,
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

const baseUrl = process.env.EMAIL_URL ? `https://${process.env.EMAIL_URL}` : "";

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

        <Body className="font-sans">
          <Container className="rounded-lg border border-gray-500">
            <Heading className="text-3xl font-bold">
              Someone just created a secret for you!
            </Heading>

            <Text>
              Hi, <span>{receiverName}!</span> You have just been selected as the receiver
              of the following secret.
            </Text>

            <Hr />

            <Section>
              <Text className="text-sm">Secret title:</Text>
              <Text className="text-xl font-bold capitalize">{secretTitle}</Text>
            </Section>

            <Hr />

            <Text className="mt-4">Click the button below to check it out!</Text>

            <Button
              className="rounded-full px-5 py-3"
              style={{
                backgroundColor: "#1d4ed8",
                color: "#fff",
              }}
              href={fullSecretUrl}
            >
              I wanna see it!
            </Button>

            <Text>
              Or, if you want, you can also copy and paste the following link into your
              browser &rarr;{" "}
              <Link className="underline" href={fullSecretUrl}>
                {fullSecretUrl}
              </Link>
            </Text>

            <Hr className="mt-5" />

            <Text className="text-center text-sm text-gray-500">
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
