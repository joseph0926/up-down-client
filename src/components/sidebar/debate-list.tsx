'use client';

import { use } from 'react';
import { SidebarDebateCard } from './debate-card';
import { useInfiniteQuery } from '@tanstack/react-query';
import { DebatePageSuccessSchema } from '@/schemas/debate.schema';
import { QUERY_KEY } from '@/lib/query/query-key';
import { getAllDebates } from '@/services/debate.service';
import { DebateCardSkeleton } from './debate-skeleton';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';

type Props = {
  allDebatePromise: Promise<DebatePageSuccessSchema>;
};

export const SidebarDebateList = ({ allDebatePromise }: Props) => {
  const firstPage = use(allDebatePromise);

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: QUERY_KEY.DEBATE.ALL,
    initialData: { pages: [firstPage], pageParams: [1] },
    getNextPageParam: (last) =>
      last.data.page * last.data.size < last.data.total
        ? last.data.page + 1
        : undefined,
    queryFn: ({ pageParam = 1 }) =>
      getAllDebates({ page: pageParam, size: 20 }),
    initialPageParam: 1,
  });

  const { sentinelRef } = useInfiniteScroll(fetchNextPage);

  return (
    <ul className="mt-4 flex flex-col gap-3 pr-2">
      {data.pages.flatMap((p) =>
        p.data.items.map((d, i) => (
          <SidebarDebateCard key={d.id} {...d} index={i} />
        )),
      )}
      {isFetchingNextPage &&
        Array.from({ length: 3 }).map((_, i) => (
          <DebateCardSkeleton key={`skeleton-${i}`} />
        ))}
      <div ref={sentinelRef} />
    </ul>
  );
};
