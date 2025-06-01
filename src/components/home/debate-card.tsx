import dayjs from 'dayjs';
import DOMPurify from 'dompurify';
import {
  Eye,
  Hourglass,
  MessageSquare,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useMemo } from 'react';
import type { Debate } from '@/types/debate.type';

interface DebateCardProps {
  debate: Debate;
}

export function DebateCard({ debate }: DebateCardProps) {
  const dDay = dayjs(debate.deadline).diff(dayjs(), 'day');
  const remain =
    debate.status === 'closed' ? '종료' : dDay === 0 ? 'D-day' : `D-${dDay}`;

  const proPct = Math.round(debate.proRatio * 100);
  const conPct = 100 - proPct;

  const preview = useMemo(() => {
    if (!debate.content) return '등록된 설명이 없습니다.';

    const clean = DOMPurify.sanitize(debate.content, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    });

    return (
      clean.replace(/\s+/g, ' ').trim().slice(0, 120) ||
      '등록된 설명이 없습니다.'
    );
  }, [debate.content]);

  return (
    <motion.article
      initial={{ opacity: 0, translateY: 12 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <header className="flex items-center gap-2 px-4 py-3">
        <Hourglass className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <h2
          className="flex-1 truncate text-sm leading-none font-semibold"
          title={debate.title}
        >
          {debate.title}
        </h2>
        <span className="ml-2 shrink-0 text-xs text-zinc-500">{remain}</span>
      </header>

      <div className="relative h-3 w-full overflow-hidden bg-zinc-200 dark:bg-zinc-700">
        <div className="flex h-full w-full">
          <div className="bg-blue-500" style={{ width: `${proPct}%` }} />
          <div className="bg-rose-500" style={{ width: `${conPct}%` }} />
        </div>
        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white drop-shadow-sm">
          찬성 {proPct}% / 반대 {conPct}%
        </span>
      </div>

      <div className="grid grid-cols-[1fr_auto] gap-3 px-4 py-3">
        <p className="line-clamp-2 text-xs text-zinc-700 sm:text-sm dark:text-zinc-300">
          {preview}
        </p>

        {debate.thumbUrl && (
          <img
            src={debate.thumbUrl}
            alt="썸네일"
            className="h-24 w-24 rounded-lg object-cover"
          />
        )}
      </div>

      <footer className="flex items-center justify-around border-t border-zinc-100 px-4 py-2 text-xs dark:border-zinc-800">
        <Metric icon={ThumbsUp} count={debate.proCount} />
        <Metric icon={ThumbsDown} count={debate.conCount} />
        <Metric icon={MessageSquare} count={debate.commentCount} />
        <Metric icon={Eye} count={debate.viewCount} />
      </footer>
    </motion.article>
  );
}

function Metric({
  icon: Icon,
  count,
}: {
  icon: typeof ThumbsUp;
  count: number;
}) {
  return (
    <div className="flex items-center gap-1">
      <Icon className="h-3.5 w-3.5 shrink-0" />
      <span className="font-medium">{count}</span>
    </div>
  );
}
