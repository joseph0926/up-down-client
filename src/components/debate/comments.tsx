import { useInfiniteQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import {
  useDeferredValue,
  useLayoutEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
import { useParams } from 'react-router';
import { CommentsSkeleton } from '@/components/state/debate/debate.loading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import { QUERY_KEY } from '@/lib/query-key';
import { getComments } from '@/services/comment.service';
import { CommentItem } from './comment-item';

export function Comments({
  bestProId,
  bestConId,
}: {
  bestProId?: string | null;
  bestConId?: string | null;
}) {
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
  const proComments = items.filter((c) => c.side === 'PRO');
  const conComments = items.filter((c) => c.side === 'CON');

  const parentRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useInfiniteScroll({
    hasNextPage,
    isFetching: isFetchingNextPage,
    onLoadMore: () => fetchNextPage(),
    root: parentRef.current,
    margin: '0px 0px 200px 0px',
  });

  const [tab, setTab] = useState<'PRO' | 'CON'>('PRO');
  const [, startTransition] = useTransition();
  const deferredTab = useDeferredValue(tab);

  const triggerRefs = useRef<Record<'PRO' | 'CON', HTMLButtonElement | null>>({
    PRO: null,
    CON: null,
  });

  const [indicator, setIndicator] = useState<{ width: number; x: number }>({
    width: 0,
    x: 0,
  });

  useLayoutEffect(() => {
    const el = triggerRefs.current[deferredTab];
    if (!el) return;
    const update = () =>
      setIndicator({ width: el.offsetWidth, x: el.offsetLeft });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [deferredTab]);

  return (
    <section ref={parentRef} className="space-y-6">
      <div className="md:hidden">
        <Tabs
          value={tab}
          onValueChange={(v) =>
            startTransition(() => setTab(v as 'PRO' | 'CON'))
          }
          className="w-full"
        >
          <TabsList className="relative flex w-full justify-between bg-transparent p-0">
            {(['PRO', 'CON'] as const).map((side) => (
              <TabsTrigger
                key={side}
                value={side}
                ref={(el) => {
                  triggerRefs.current[side] = el;
                }}
                className="relative flex-1 py-2 text-sm font-medium text-zinc-500 data-[state=active]:text-zinc-900 dark:data-[state=active]:text-zinc-100"
              >
                {side === 'PRO'
                  ? `찬성 (${proComments.length})`
                  : `반대 (${conComments.length})`}
              </TabsTrigger>
            ))}
            <motion.span
              className="absolute -bottom-px h-0.5 rounded-full bg-zinc-900 dark:bg-zinc-100"
              animate={indicator}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            />
          </TabsList>

          <TabsContent value="PRO" className="mt-4 space-y-6">
            {deferredTab === 'PRO'
              ? proComments.map((c) => (
                  <CommentItem key={c.id} {...c} isBest={c.id === bestProId} />
                ))
              : null}
          </TabsContent>
          <TabsContent value="CON" className="mt-4 space-y-6">
            {deferredTab === 'CON'
              ? conComments.map((c) => (
                  <CommentItem key={c.id} {...c} isBest={c.id === bestConId} />
                ))
              : null}
          </TabsContent>
        </Tabs>
      </div>

      <div className="hidden gap-6 md:grid md:grid-cols-2">
        <div className="space-y-6">
          {proComments.map((c) => (
            <CommentItem key={c.id} {...c} isBest={c.id === bestProId} />
          ))}
        </div>
        <div className="space-y-6">
          {conComments.map((c) => (
            <CommentItem key={c.id} {...c} isBest={c.id === bestConId} />
          ))}
        </div>
      </div>

      <div ref={sentinelRef} />
      {isFetchingNextPage && <CommentsSkeleton />}
    </section>
  );
}
