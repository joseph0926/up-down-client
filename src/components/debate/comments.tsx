import { useInfiniteQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { useParams } from 'react-router';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import { QUERY_KEY } from '@/lib/query-key';
import { getComments } from '@/services/comment.service';
import { CommentsSkeleton } from '../state/debate/debate.loading';
import { CommentItem } from './comment-item';

export function Comments() {
  const { debateId } = useParams<{ debateId: string }>();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: QUERY_KEY.COMMENTS.ALL(debateId),
      queryFn: ({ pageParam }) =>
        getComments({ debateId, cursor: pageParam as string | undefined }),
      initialPageParam: '',
      getNextPageParam: (last) => last.nextCursor ?? undefined,
      enabled: !!debateId,
    });

  const items = data?.pages.flatMap((p) => p.items) ?? [];

  const parentRef = useRef<HTMLDivElement | null>(null);

  const sentinelRef = useInfiniteScroll({
    hasNextPage,
    isFetching: isFetchingNextPage,
    onLoadMore: () => fetchNextPage(),
    root: parentRef.current,
    margin: '0px 0px 200px 0px',
  });

  const proComments = items.filter((c) => c.side === 'PRO');
  const conComments = items.filter((c) => c.side === 'CON');

  return (
    <section ref={parentRef} className="grid gap-6 md:grid-cols-2">
      <div className="space-y-6">
        {proComments.map((c) => (
          <CommentItem key={c.id} {...c} />
        ))}
      </div>
      <div className="space-y-6">
        {conComments.map((c) => (
          <CommentItem key={c.id} {...c} />
        ))}
      </div>
      <div ref={sentinelRef} />
      {isFetchingNextPage && <CommentsSkeleton />}
    </section>
  );
}
