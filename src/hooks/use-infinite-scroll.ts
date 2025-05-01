import { useCallback, useEffect, useRef } from 'react';

export const useInfiniteScroll = ({
  target,
  onIntersect,
  enabled,
  root = null,
  rootMargin = '0px',
  threshold = 0.1,
}: {
  target: React.RefObject<Element | null>;
  onIntersect: () => void;
  enabled: boolean;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
}) => {
  const savedCallback = useRef(onIntersect);
  savedCallback.current = onIntersect;

  const handleIntersect: IntersectionObserverCallback = useCallback(
    (entries) => {
      if (!enabled) return;
      const [entry] = entries;
      if (entry.isIntersecting) savedCallback.current();
    },
    [enabled],
  );

  useEffect(() => {
    if (!target.current || !enabled) return;
    const observer = new IntersectionObserver(handleIntersect, {
      root,
      rootMargin,
      threshold,
    });
    observer.observe(target.current);
    return () => observer.disconnect();
  }, [handleIntersect, root, rootMargin, threshold, enabled]);
};
