export default function SecretSlugPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  return <div>{id}</div>;
}
