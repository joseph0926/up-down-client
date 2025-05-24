import { useEffect, useRef } from 'react';

type UseInfiniteScrollProps = {
  hasNextPage: boolean | undefined;
  isFetching: boolean;
  onLoadMore: () => void;
  root?: HTMLElement | null;
  margin?: string;
};

export function useInfiniteScroll({
  hasNextPage,
  isFetching,
  onLoadMore,
  root = null,
  margin = '0px 0px 300px 0px',
}: UseInfiniteScrollProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          onLoadMore();
        }
      },
      { root, rootMargin: margin },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [hasNextPage, isFetching, onLoadMore, root, margin]);

  return sentinelRef;
}
