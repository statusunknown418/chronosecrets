import { APP_URL, REPLY_TO_EMAIL } from "@/lib/constants";
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

export const SecretAvailableEmail: FunctionComponent<NewSecretEmailProps> = ({
  receiverName,
  secretId,
  secretTitle,
  receiverEmail,
  receiverUsername,
}) => {
  /**
   * TODO: Change this to the real URL when we have a domain
   */
  const fullSecretUrl = `${APP_URL}/receiving/${secretId}`;

  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>🫡 A secret made for you is available to be seen now!</Preview>

        <Body className="font-sans">
          <Container className="rounded-lg border border-gray-500">
            <Heading className="text-3xl font-bold">
              A secret has just reached its revealing date!
            </Heading>

            <Text className="flex items-center gap-1">
              Hi, <span>{receiverName}!</span>
            </Text>

            <Text className="font-bold">You will want to check this out!</Text>
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
              I want to see it now!
            </Button>

            <Text>
              If the button is giving you any trouble, just click this link{" "}
              <Link className="underline" href={fullSecretUrl}>
                {fullSecretUrl}
              </Link>
            </Text>

            <Hr className="mt-5" />

            <Text className="text-center text-sm text-gray-500">
              Please note that this email was intended for{" "}
              <strong className="text-black">{receiverUsername}</strong> - registered as{" "}
              {receiverEmail}. If you received this email by mistake, please reach out to
              us{" "}
              <Link href={`mailto:${REPLY_TO_EMAIL}`} className="underline">
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
