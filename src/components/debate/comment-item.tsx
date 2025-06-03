import 'dayjs/locale/ko';
import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ThumbsUp, User } from 'lucide-react';
import { motion } from 'motion/react';
import {
  memo,
  startTransition,
  useLayoutEffect,
  useOptimistic,
  useRef,
  useState,
} from 'react';
import { QUERY_KEY } from '@/lib/query-key';
import { cn } from '@/lib/utils';
import type { CommentList } from '@/schemas/comment.schema';
import { toggleCommentLike } from '@/services/comment.service';

dayjs.extend(relativeTime);

type CommentSide = 'PRO' | 'CON';

export interface CommentItemProps {
  id: string;
  nickname: string;
  side: CommentSide;
  content: string;
  likes: number;
  createdAt: string;
  debateId: string;
  liked: boolean;
}

export const CommentItem = memo(
  ({
    nickname,
    side,
    content,
    likes,
    createdAt,
    debateId,
    id,
    liked,
  }: CommentItemProps) => {
    const isPro = side === 'PRO';

    const paragraphRef = useRef<HTMLParagraphElement | null>(null);
    const [overflowing, setOverflowing] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const [optState, addOptimistic] = useOptimistic(
      { likes, liked },
      (prev, action: 'toggle') =>
        action === 'toggle'
          ? prev.liked
            ? { liked: false, likes: prev.likes - 1 }
            : { liked: true, likes: prev.likes + 1 }
          : prev,
    );

    const qc = useQueryClient();
    const { mutate: toggleLike, isPending } = useMutation({
      mutationFn: toggleCommentLike,
      onMutate: async (commentId: string) => {
        startTransition(() => addOptimistic('toggle'));

        await qc.cancelQueries({ queryKey: QUERY_KEY.COMMENTS.ALL(debateId) });
        const prev = qc.getQueryData<InfiniteData<CommentList>>(
          QUERY_KEY.COMMENTS.ALL(debateId),
        );

        qc.setQueryData<InfiniteData<CommentList>>(
          QUERY_KEY.COMMENTS.ALL(debateId),
          (old) =>
            old && {
              ...old,
              pages: old.pages.map((page) => ({
                ...page,
                items: page.items.map((c) =>
                  c.id === commentId
                    ? {
                        ...c,
                        likes: c.liked ? c.likes - 1 : c.likes + 1,
                        liked: !c.liked,
                      }
                    : c,
                ),
              })),
            },
        );
        return { prev };
      },

      onError: (_e, _id, ctx) => {
        startTransition(() => addOptimistic('toggle'));
        if (ctx?.prev)
          qc.setQueryData(QUERY_KEY.COMMENTS.ALL(debateId), ctx.prev);
      },

      onSettled: () => {
        qc.invalidateQueries({ queryKey: QUERY_KEY.COMMENTS.ALL(debateId) });
      },
    });

    useLayoutEffect(() => {
      const el = paragraphRef.current;
      if (!el) return;

      setOverflowing(el.scrollHeight > el.clientHeight + 1);
    }, [content]);

    return (
      <motion.article
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        role="article"
        aria-labelledby={`${side}-${nickname}`}
        className={cn(
          'flex gap-3 rounded-xl border bg-white p-4 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-800/40',
          isPro ? 'md:col-start-1' : 'md:col-start-2',
          'min-h-[156px]',
        )}
      >
        <div
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white',
            isPro ? 'bg-blue-600' : 'bg-red-600',
          )}
        >
          <User />
        </div>
        <div className="flex-1 space-y-1">
          <p
            id={`${side}-${nickname}`}
            className="text-sm leading-none font-medium"
          >
            {nickname}
          </p>
          <div className="flex flex-wrap items-center gap-1 text-xs">
            <span className={cn(isPro ? 'text-blue-600' : 'text-red-600')}>
              {isPro ? '찬성' : '반대'}
            </span>
            <span className="text-zinc-500 dark:text-zinc-400">
              {dayjs(createdAt).locale('ko').fromNow()}
            </span>
          </div>
          <p
            ref={paragraphRef}
            className={cn(
              'text-sm text-zinc-700 dark:text-zinc-300',
              !expanded && 'line-clamp-3',
            )}
          >
            {content}
          </p>
          <div className="flex items-center justify-between gap-4">
            {overflowing && (
              <button
                onClick={() => setExpanded((p) => !p)}
                className={cn(
                  'text-xs font-medium',
                  isPro ? 'text-blue-600' : 'text-red-600',
                )}
                aria-expanded={expanded}
              >
                {expanded ? '접기' : '더보기'}
              </button>
            )}
            <button
              onClick={() => toggleLike(id)}
              disabled={isPending}
              aria-label="좋아요"
              className={cn(
                'mt-1 inline-flex cursor-pointer items-center gap-1 text-xs transition-colors',
                optState.liked
                  ? isPro
                    ? 'text-blue-600'
                    : 'text-red-600'
                  : 'text-zinc-500',
              )}
            >
              <ThumbsUp
                className={cn(
                  'h-3.5 w-3.5',
                  optState.liked && (isPro ? 'fill-blue-600' : 'fill-red-600'),
                )}
              />
              {optState.likes}
            </button>
          </div>
        </div>
      </motion.article>
    );
  },
);

CommentItem.displayName = 'CommentItem';
