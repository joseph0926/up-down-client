import { SidebarWrapper } from '@/components/sidebar';

export default function DebateLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SidebarWrapper />
      <main>{children}</main>
    </>
  );
}
