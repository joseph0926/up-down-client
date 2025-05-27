import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Menu, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { cn } from '@/lib/utils';

const hotKeywords = [
  { word: '총선', score: 82 },
  { word: 'AI규제', score: 76 },
  { word: '주4일제', score: 65 },
  { word: '부동산', score: 52 },
  { word: '리모트워크', score: 40 },
];

const communities = ['#총선', '#AI규제', '#부동산', '#주4일제'];

const featured = {
  title: '총선 공약별 효과, 어떻게 판단해야 할까?',
  thumb: 'https://source.unsplash.com/400x200?vote',
  summary: '여야 공약 비교 · 핵심 지표 인포그래픽 포함',
};

const liveGauges = [
  {
    id: 'deb-1',
    title: 'AI 기업 규제 필요?',
    pro: 58,
    con: 42,
  },
  {
    id: 'deb-2',
    title: '주4일제 시범 도입',
    pro: 73,
    con: 27,
  },
  {
    id: 'deb-3',
    title: '부동산 세제 완화',
    pro: 44,
    con: 56,
  },
];

const localHistory = [
  { id: 1, title: '총선 공매도 금지', viewedAt: dayjs().subtract(1, 'h') },
  { id: 2, title: 'AI 기업 규제 필요?', viewedAt: dayjs().subtract(2, 'h') },
  { id: 3, title: '주4일제 시범 도입', viewedAt: dayjs().subtract(5, 'h') },
];

dayjs.extend(relativeTime);

export function MobileSidebar() {
  return (
    <Drawer>
      <DrawerTrigger className="inline-flex items-center px-2 sm:hidden">
        <Menu className="h-6 w-6" />
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh] rounded-t-2xl border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <DrawerHeader className="flex items-center justify-between">
          <DrawerTitle>메뉴</DrawerTitle>
          <DrawerClose>
            <X className="h-6 w-6" />
          </DrawerClose>
        </DrawerHeader>
        <aside className="space-y-6 overflow-y-auto px-4 pb-8">
          <Section title="실시간 키워드">
            <div className="space-y-2">
              {hotKeywords.map((k) => (
                <KeywordGauge key={k.word} word={k.word} score={k.score} />
              ))}
            </div>
          </Section>

          <Section title="오늘의 핵심 토론">
            <FeaturedDebateCard {...featured} />
          </Section>

          <Section title="실시간 투표 현황">
            <div className="space-y-4">
              {liveGauges.map((g) => (
                <LiveGaugeBar key={g.id} {...g} />
              ))}
            </div>
          </Section>

          <Section title="커뮤니티">
            <div className="flex flex-wrap gap-2">
              {communities.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-zinc-100 px-3 py-0.5 text-sm dark:bg-zinc-800 dark:text-zinc-200"
                >
                  {c}
                </span>
              ))}
            </div>
          </Section>

          <Section title="최근에 본 토론">
            <ul className="space-y-2 text-sm">
              {localHistory.map((h) => (
                <li key={h.id} className="flex items-center justify-between">
                  <span className="max-w-[70%] truncate">{h.title}</span>
                  <span className="text-xs text-zinc-400">
                    {dayjs(h.viewedAt).fromNow()}
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        </aside>
      </DrawerContent>
    </Drawer>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h3 className="text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
        {title}
      </h3>
      {children}
    </section>
  );
}

function KeywordGauge({ word, score }: { word: string; score: number }) {
  return (
    <button
      className="w-full space-y-1 text-left"
      aria-label={`${word} 토론 보기`}
    >
      <div className="flex items-center justify-between text-sm font-medium">
        <span>{`#${word}`}</span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {score}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded bg-zinc-200 dark:bg-zinc-800">
        <motion.div
          layout
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
        />
      </div>
    </button>
  );
}

function FeaturedDebateCard({
  title,
  thumb,
  summary,
}: {
  title: string;
  thumb: string;
  summary: string;
}) {
  return (
    <article className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
      <img src={thumb} alt={title} className="h-28 w-full object-cover" />
      <div className="space-y-1 p-3">
        <h4 className="line-clamp-2 text-sm leading-tight font-semibold">
          {title}
        </h4>
        <p className="line-clamp-1 text-xs text-zinc-500 dark:text-zinc-400">
          {summary}
        </p>
        <div className="mt-2 flex gap-2">
          <VoteButton side="찬성" />
          <VoteButton side="반대" />
        </div>
      </div>
    </article>
  );
}

function VoteButton({ side }: { side: '찬성' | '반대' }) {
  const color =
    side === '찬성'
      ? 'bg-blue-600 hover:bg-blue-700'
      : 'bg-red-500 hover:bg-red-600';
  return (
    <button
      className={cn(
        'flex-1 rounded py-1 text-xs font-medium text-white',
        color,
      )}
    >
      {side}
    </button>
  );
}

function LiveGaugeBar({
  id,
  title,
  pro,
  con,
}: {
  id: string;
  title: string;
  pro: number;
  con: number;
}) {
  const [percentage, setPercentage] = useState({ pro, con });

  useEffect(() => {
    const iv = setInterval(() => {
      setPercentage((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const newPro = Math.min(100, Math.max(0, prev.pro + delta));
        return { pro: newPro, con: 100 - newPro };
      });
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  return (
    <button
      key={id}
      className="w-full space-y-1 text-left"
      aria-label={`${title} 토론으로 이동`}
    >
      <div className="flex items-center justify-between text-sm font-medium">
        <span className="max-w-[70%] truncate">{title}</span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {percentage.pro}%
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded bg-zinc-200 dark:bg-zinc-800">
        <motion.div
          key={id}
          layout
          animate={{ width: `${percentage.pro}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          className="h-full bg-blue-600"
        />
      </div>
    </button>
  );
}
