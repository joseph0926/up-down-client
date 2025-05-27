import { useInfiniteQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import { type ComponentProps, useRef } from 'react';
import { Link } from 'react-router';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import { QUERY_KEY } from '@/lib/query-key';
import { cn } from '@/lib/utils';
import { getDebates } from '@/services/debate.service';
import { ErrorView, SkeletonList } from '../state/home/feed.state';
import { DebateCard } from './debate-card';

export type FeedProps = ComponentProps<'section'> & {
  sort?: 'hot' | 'imminent' | 'latest';
  limit?: number;
};

export function Feed({
  className,
  sort = 'latest',
  limit = 10,
  ...rest
}: FeedProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isFetching,
    isPending,
    refetch,
  } = useInfiniteQuery({
    queryKey: QUERY_KEY.DEBATES.ALL(sort),
    queryFn: ({ pageParam }) =>
      getDebates({ sort, limit, cursor: pageParam as string | undefined }),
    initialPageParam: '',
    getNextPageParam: (last) => last.nextCursor ?? undefined,
    placeholderData: (d) => d,
    staleTime: Infinity,
  });

  const parentRef = useRef<HTMLDivElement | null>(null);
  const items = data?.pages.flatMap((p) => p.items) ?? [];

  const sentinelRef = useInfiniteScroll({
    hasNextPage,
    isFetching: isFetchingNextPage,
    onLoadMore: () => fetchNextPage(),
    root: parentRef.current,
    margin: '0px 0px 300px 0px',
  });

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 260,
    overscan: 5,
  });

  return (
    <section className={cn('space-y-6', className)} {...rest}>
      {isPending ? (
        <SkeletonList count={3} />
      ) : isError ? (
        <ErrorView onRetry={() => refetch()} />
      ) : (
        <div ref={parentRef} className="relative max-h-screen overflow-y-auto">
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: 'relative',
              width: '100%',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const debate = items[virtualRow.index];

              return (
                <Link
                  to={`/debate/${debate.id}`}
                  key={debate.id}
                  data-index={virtualRow.index}
                  ref={rowVirtualizer.measureElement}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${virtualRow.start}px)`,
                    paddingBottom: 16,
                  }}
                >
                  <DebateCard debate={debate} />
                </Link>
              );
            })}
          </div>
          <div ref={sentinelRef} className="h-1" />
        </div>
      )}
      {isFetching && !isFetchingNextPage ? <SkeletonList count={1} /> : null}
    </section>
  );
}
