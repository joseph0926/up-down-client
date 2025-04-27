'use client';

import { useInfiniteDebates } from '@/services/debate.query';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { SortType } from '@/types/debate.type';

export function Sidebar() {
  const [sort, setSort] = useState<SortType>('hot');
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteDebates(
    sort,
    12,
  );

  const { sentinelRef } = useInfiniteScroll(hasNextPage, fetchNextPage);

  return (
    <section className="mt-10">
      <Tabs value={sort} onValueChange={(v) => setSort(v as SortType)}>
        <TabsList>
          <TabsTrigger value="hot">HOT</TabsTrigger>
          <TabsTrigger value="imminent">임박</TabsTrigger>
          <TabsTrigger value="latest">최신</TabsTrigger>
        </TabsList>

        <TabsContent value={sort}>
          <DebateList pages={data?.pages} status={status} />
          <div ref={sentinelRef} className="h-10" />
        </TabsContent>
      </Tabs>
    </section>
  );
}
