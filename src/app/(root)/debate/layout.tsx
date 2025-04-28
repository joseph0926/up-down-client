export const metadata = { title: '토론 | Up&Down' };

export default function DebateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-[280px_1fr_260px]">
      <SidebarLazy />
      <section className="border-x px-6 py-4">{children}</section>
      <aside className="hidden px-4 py-4 lg:block">
        <RightPanel />
      </aside>
    </div>
  );
}

const SidebarLazy = async () => {
  const { Sidebar } = await import(
    '@/app/(root)/debate/components/sidebar.client'
  );
  return <Sidebar />;
};
const RightPanel = async () => {
  const { HotPanel } = await import('@/components/panel/hot-list');
  return <HotPanel />;
};
