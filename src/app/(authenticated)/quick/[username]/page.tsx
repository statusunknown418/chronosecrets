export default function AutoAddFriend({
  params: { username },
}: {
  params: { username: string };
}) {
  const decoded = decodeURIComponent(username);
  return (
    <div>
      <h1>Auto add friend</h1>

      <p>Decoded: {decoded}</p>
    </div>
  );
}
