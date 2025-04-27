import { useCallback, useEffect, useRef } from 'react';

export interface InfiniteScrollOptions extends IntersectionObserverInit {
  disabled?: boolean;
}

export const useInfiniteScroll = (
  hasNextPage: boolean,
  onReachBottom: () => void,
  options: InfiniteScrollOptions = {},
) => {
  const {
    root = null,
    rootMargin = '0px',
    threshold = 0.1,
    disabled = false,
  } = options;
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const handleIntersect: IntersectionObserverCallback = useCallback(
    (entries) => {
      const [entry] = entries;

      if (entry.isIntersecting && !disabled) {
        onReachBottom();
      }
    },
    [onReachBottom, disabled],
  );

  useEffect(() => {
    if (!sentinelRef.current || disabled) return;

    const observer = new IntersectionObserver(handleIntersect, {
      root,
      rootMargin,
      threshold,
    });

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [handleIntersect, root, rootMargin, threshold, disabled]);

  return { sentinelRef } as const;
};
