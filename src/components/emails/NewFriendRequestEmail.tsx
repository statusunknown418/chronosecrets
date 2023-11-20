import { NewFriendRequestNotificationInput } from "@/lib/api/transactional/mutations";
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
  Tailwind,
  Text,
} from "@react-email/components";

export const NewFriendRequestEmail = ({
  sourceId,
  sourceUsername,
  targetUsername,
  targetEmail,
  targetId,
}: NewFriendRequestNotificationInput) => {
  const fullAcceptUrl = `${APP_URL}/requests/${sourceId}/${targetId}`;

  return (
    <Tailwind>
      <Html>
        <Head />

        <Preview>
          {sourceUsername} has sent you a friend request on ChronoSecrets!
        </Preview>

        <Body className="mx-auto my-auto font-sans">
          <Container className="rounded-lg p-5">
            <Heading className="text-3xl font-bold">
              You have a new friend request!
            </Heading>

            <Text>
              Hi {targetUsername}! {sourceUsername} has just sent you a friend request on
              ChronoSecrets!
            </Text>

            <Button
              className="mt-4 rounded-full px-5 py-3"
              style={{
                backgroundColor: "#1d4ed8",
                color: "#fff",
              }}
              href={fullAcceptUrl}
            >
              Accept!
            </Button>

            <Hr className="mt-4" />

            <Text className="text-center">
              If you are having trouble clicking the button, copy and paste the following
              link in your browser <Link href={fullAcceptUrl}>{fullAcceptUrl}</Link>
            </Text>

            <Hr className="mt-4" />

            <Text className="text-center text-sm text-gray-500">
              Please note that this email was intended for{" "}
              <strong className="text-black">{targetUsername}</strong> - registered as{" "}
              {targetEmail}. If you received this email by mistake, please reach out to us{" "}
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
