'use client';

import { useKeywords } from '@/hooks/use-keywords';
import { Skeleton } from '../ui/skeleton';
import { HotGauge } from './hot-gague';

type HotKeywordsProps = {
  skeleton?: number;
};

export const HotKeywords = ({ skeleton = 5 }: HotKeywordsProps) => {
  const keywords = useKeywords();
  const loading = keywords.length === 0;

  return (
    <>
      {loading
        ? Array.from({ length: skeleton }).map((_, i) => (
            <li key={i} className="flex items-center gap-2 py-1.5">
              <Skeleton className="h-4 w-20 rounded-sm" />
              <Skeleton className="h-1.5 w-16 rounded-full md:w-24" />
            </li>
          ))
        : keywords.map((k) => (
            <li key={k.word} className="flex items-center gap-2 py-1.5">
              <span
                className="text-primary shrink-0 text-sm font-medium"
                aria-label={`키워드 ${k.word}`}
              >
                #{k.word}
              </span>
              <HotGauge index={k.index} />
            </li>
          ))}
    </>
  );
};
