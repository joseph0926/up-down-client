import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ThumbsUp, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useLayoutEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

dayjs.extend(relativeTime);

type CommentSide = 'PRO' | 'CON';

export interface CommentItemProps {
  id: string;
  nickname: string;
  side: CommentSide;
  content: string;
  likes: number;
  createdAt: string;
}

export function CommentItem({
  nickname,
  side,
  content,
  likes,
  createdAt,
}: CommentItemProps) {
  const isPro = side === 'PRO';
  const color = isPro ? 'blue' : 'red';

  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const [overflowing, setOverflowing] = useState(false);
  const [expanded, setExpanded] = useState(false);

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
        'min-h-[128px]',
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
            className={cn(
              'hover:text- mt-1 inline-flex items-center gap-1 text-xs text-zinc-500',
              `${color}-600`,
            )}
            aria-label="좋아요"
          >
            <ThumbsUp className="h-3.5 w-3.5" /> {likes}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
