export default function RootGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="mx-auto max-w-6xl p-6">{children}</main>;
}
