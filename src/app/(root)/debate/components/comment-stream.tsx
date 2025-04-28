'use client';

import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'motion/react';

interface Props {
  debateId: string;
}
export default function CommentStream({ debateId }: Props) {
  const { data, status, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteComments(debateId, 20);

  const { sentinelRef } = useInfiniteScroll(hasNextPage, fetchNextPage);

  if (status === 'error')
    return <p className="text-destructive">댓글 로드 실패</p>;

  return (
    <section className="mt-8 space-y-4">
      {data?.pages
        .flatMap((p) => p.items)
        .map((c) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-md border p-3 text-sm"
          >
            <div className="mb-1 flex items-center justify-between">
              <span className="font-medium">{c.nickname}</span>
              <span className="text-muted-foreground text-xs">
                {c.side === 'PRO' ? '👍' : '👎'}
              </span>
            </div>
            <p>{c.content}</p>
          </motion.div>
        ))}

      {(status === 'loading' || isFetchingNextPage) && (
        <Skeleton className="h-12 w-full" />
      )}

      <div ref={sentinelRef} className="h-6" />
    </section>
  );
}
