'use client';

import { useInfiniteDebates } from '@/services/debate.query';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import { DebateCard } from './debate-card';

export function Sidebar() {
  const { data, hasNextPage, fetchNextPage, status } = useInfiniteDebates(
    'latest',
    14,
  );
  const { sentinelRef } = useInfiniteScroll(hasNextPage, fetchNextPage);

  return (
    <aside className="h-[calc(100vh-64px)] overflow-y-auto border-r p-4">
      {data?.pages
        .flatMap((p) => p.items)
        .map((d) => <DebateCard key={d.id} data={d} small />)}
      {status === 'pending' && (
        <p className="text-muted-foreground py-4 text-center">로딩…</p>
      )}
      <div ref={sentinelRef} />
    </aside>
  );
}
