import { Quote, ThumbsDown, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Comment } from '@/schemas/comment.schema';

export type OptionCardProps = {
  side: 'pro' | 'con';
  label: string;
  ratio: number;
  votes: number;
  best?: Comment | null;
  className?: string;
};

export function OptionCard({
  side,
  label,
  ratio,
  votes,
  best,
  className,
}: OptionCardProps) {
  const isPro = side === 'pro';
  const percentStr = `${(ratio * 100).toFixed(0)}%`;

  return (
    <article
      className={cn(
        'flex flex-col gap-3 rounded-2xl border p-4 shadow-sm',
        isPro
          ? 'border-blue-200 bg-blue-50 dark:border-blue-400/40 dark:bg-blue-400/10'
          : 'border-red-200 bg-red-50 dark:border-red-400/40 dark:bg-red-400/10',
        className,
      )}
    >
      <header className="flex items-center gap-2">
        {isPro ? (
          <ThumbsUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        ) : (
          <ThumbsDown className="h-4 w-4 text-red-600 dark:text-red-400" />
        )}
        <span className="text-sm font-semibold md:text-base">{label}</span>
      </header>

      {best ? (
        <blockquote className="relative rounded-md p-2 text-[11px] leading-relaxed">
          <Quote className="absolute top-1 -left-3 h-4 w-4 opacity-30" />
          <span className="font-semibold">{best.nickname}</span> —{' '}
          <span className="italic">{best.content}</span>
        </blockquote>
      ) : (
        <p className="line-clamp-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
          아직 베스트 댓글이 존재하지 않습니다.
        </p>
      )}

      <footer className="mt-auto space-y-1">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
          <div
            className={cn('h-full', isPro ? 'bg-blue-500' : 'bg-red-500')}
            style={{ width: percentStr }}
          />
        </div>
        <div className="flex items-center justify-between text-[10px] font-medium text-zinc-600 dark:text-zinc-400">
          <span>{percentStr}</span>
          <span>{votes.toLocaleString()}표</span>
        </div>
      </footer>
    </article>
  );
}
