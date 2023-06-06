export default function PostDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className=" min-h-screen">
      <div className=" max-w-6xl m-auto">{children}</div>
    </main>
  );
}
