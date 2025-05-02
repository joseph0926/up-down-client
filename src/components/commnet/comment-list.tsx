'use client';

import { useRef } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import { useComments } from '@/services/comment.query';

type Props = {
  debateId: string;
  side: 'PRO' | 'CON';
};

export const CommentList = ({ debateId, side }: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useComments(debateId, side);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useInfiniteScroll({
    target: sentinelRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  if (status === 'pending') return <CommentSkeleton />;

  if (status === 'error')
    return (
      <p className="py-4 text-sm text-red-500">댓글을 불러오지 못했습니다.</p>
    );

  const comments = data.pages.flatMap((p) => p.items);

  return (
    <div className="space-y-4">
      {comments.map((c) => (
        <Card key={`${c.id}-${Math.random()}`}>
          <CardContent className="space-y-1 py-3">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{c.nickname}</span>
              <span>{new Date(c.createdAt).toLocaleString()}</span>
            </div>
            <p className="text-sm whitespace-pre-wrap">{c.content}</p>
          </CardContent>
        </Card>
      ))}

      {hasNextPage && (
        <div
          ref={sentinelRef}
          className="py-3 text-center text-xs text-gray-500"
        >
          {isFetchingNextPage ? '불러오는 중…' : '더 불러오기'}
        </div>
      )}
    </div>
  );
};

const CommentSkeleton = () => (
  <div className="space-y-4">
    {Array.from({ length: 3 }).map((_, i) => (
      <Skeleton key={i} className="h-16 w-full" />
    ))}
  </div>
);
