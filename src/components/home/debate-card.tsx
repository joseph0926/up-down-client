import dayjs from 'dayjs';
import { Hourglass, MoreVertical, ThumbsDown, ThumbsUp } from 'lucide-react';
import { motion } from 'motion/react';
import type { Debate } from '@/types/debate.type';

export function DebateCard({ debate }: { debate: Debate }) {
  const remainText = dayjs(debate.deadline).toISOString();

  return (
    <motion.article
      initial={{ opacity: 0, translateY: 16 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
    >
      <header className="flex items-center gap-2 px-4 pt-4">
        <Hourglass className="h-4 w-4 text-blue-600" />
        <h2
          className="flex-1 truncate text-sm font-semibold"
          title={debate.title}
        >
          {debate.title}
        </h2>
        <span className="text-xs whitespace-nowrap text-zinc-500">
          {remainText}
        </span>
        <button className="p-1 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
          <MoreVertical className="h-4 w-4" />
        </button>
      </header>

      {debate.thumbUrl && (
        <img
          src={debate.thumbUrl}
          alt="thumb"
          className="mt-3 aspect-[4/2] w-full object-cover"
        />
      )}
      <div className="space-y-2 px-4 pt-4 pb-3">
        <div className="relative h-3 w-full overflow-hidden rounded-full bg-red-200 dark:bg-red-900">
          <div
            className="h-full bg-blue-500"
            style={{ width: `${debate.proRatio}%` }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-white drop-shadow-sm">
            찬성 {debate.proRatio}% / 반대 {debate.conRatio}%
          </span>
        </div>
        {debate.status === 'closed' && (
          <p className="text-xs text-zinc-500">토론 종료</p>
        )}
      </div>
      <footer className="flex items-center gap-4 border-t border-zinc-200 px-4 py-3 text-sm dark:border-zinc-800">
        <button className="flex items-center gap-1 hover:underline">
          <ThumbsUp className="h-4 w-4" /> 찬성
        </button>
        <button className="flex items-center gap-1 hover:underline">
          <ThumbsDown className="h-4 w-4" /> 반대
        </button>
      </footer>
    </motion.article>
  );
}
