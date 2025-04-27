import { DebateCard } from '@/components/debate/debate-card';
import { Suspense } from 'react';
import SidebarSkeleton from '@/components/sidebar/debate-skeleton';
import { fetchHot } from '@/services/debate.service';
import { notFound } from 'next/navigation';

export default async function HomePage() {
  const hot = await fetchHot(3).catch(() => null);
  if (!hot) return notFound();

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">지금 뜨거운 토론</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {hot.items.map((d) => (
          <DebateCard key={d.id} data={d} />
        ))}
      </div>
      <Suspense fallback={<SidebarSkeleton />}>
        <SidebarLazy />
      </Suspense>
    </>
  );
}

const SidebarLazy = async () => {
  const { Sidebar } = await import('@/components/sidebar');
  return <Sidebar />;
};
