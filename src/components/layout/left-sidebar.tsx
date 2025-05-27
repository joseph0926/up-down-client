import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { motion } from 'motion/react';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

dayjs.extend(relativeTime);

const hotKeywords: { word: string; score: number }[] = [
  { word: '총선', score: 100 },
  { word: '공매도', score: 86 },
  { word: '주4일제', score: 78 },
  { word: 'AI규제', score: 65 },
  { word: '부동산', score: 52 },
];

const recents = ['총선 공매도 금지', 'AI 기업 규제 필요?', '주4일제 시범 도입'];

const upcomingDebates: { title: string; startsAt: string; endsAt: string }[] = [
  {
    title: '최저임금 인상 폭, 적절한가?',
    startsAt: dayjs().add(2, 'hour').toISOString(),
    endsAt: dayjs().add(26, 'hour').toISOString(),
  },
  {
    title: '부동산 세제 개편 방향',
    startsAt: dayjs().add(1, 'day').toISOString(),
    endsAt: dayjs().add(3, 'day').toISOString(),
  },
  {
    title: 'AI 저작권 법안 시급성',
    startsAt: dayjs().add(3, 'day').toISOString(),
    endsAt: dayjs().add(5, 'day').toISOString(),
  },
];

const policyCards = [
  {
    title: '국회 의안 21345',
    subtitle: '주4일제 시범사업 근거법',
    url: '#',
  },
  {
    title: '통계청 실업률 2025.04',
    subtitle: '청년 실업률 8.4%',
    url: '#',
  },
  {
    title: 'OECD 탄소세 비교',
    subtitle: '한국 17.3 USD/톤',
    url: '#',
  },
];

type SidebarProps = ComponentProps<'aside'>;

export function LeftSidebar({ className, ...rest }: SidebarProps) {
  return (
    <aside
      className={cn(
        'sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pr-4 pb-10',
        className,
      )}
      {...rest}
    >
      <section className="space-y-6">
        <ExclusiveOffer />

        <NavSection title="Trend Radar">
          <ul className="space-y-1">
            {hotKeywords.map((k, idx) => (
              <li key={k.word} className="px-3 py-1.5">
                <button className="w-full text-left">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-5 text-right text-xs text-zinc-400">
                      {idx + 1}
                    </span>
                    <span className="font-medium">#{k.word}</span>
                  </div>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded bg-zinc-200 dark:bg-zinc-800">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${k.score}%` }}
                      transition={{ duration: 0.6 }}
                      className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                    />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </NavSection>
        <NavSection title="곧 열리는 토론">
          <ul className="space-y-1 text-sm">
            {upcomingDebates.map((d) => (
              <li
                key={d.title}
                className="cursor-pointer rounded-md px-3 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <p className="truncate font-medium">{d.title}</p>
                <p className="text-xs text-zinc-500">
                  {dayjs(d.startsAt).fromNow()} ·{' '}
                  {dayjs(d.endsAt).fromNow(true)} left
                </p>
              </li>
            ))}
          </ul>
        </NavSection>

        <NavSection title="다가오는 일정">
          <ul className="space-y-1 text-sm">
            {policyCards.map((p) => (
              <li key={p.title} className="px-3 py-1.5">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md border border-zinc-200 p-3 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/40"
                >
                  <p className="truncate font-medium">{p.title}</p>
                  <p className="truncate text-xs text-zinc-500">{p.subtitle}</p>
                </a>
              </li>
            ))}
          </ul>
        </NavSection>

        <NavSection title="Recent">
          <ul className="space-y-1 text-sm">
            {recents.map((t) => (
              <li
                key={t}
                className="cursor-pointer rounded-md px-3 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                {t}
              </li>
            ))}
          </ul>
        </NavSection>
      </section>
    </aside>
  );
}

function ExclusiveOffer() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 p-4 text-white shadow-lg">
      <div className="absolute inset-0 bg-[url('https://source.unsplash.com/200x200?debate')] bg-cover opacity-20" />
      <div className="relative space-y-1">
        <p className="text-xs tracking-wider uppercase">Hot Issue</p>
        <p className="leading-tight font-semibold">
          실시간 토론 참여하고 의견을 올려보세요 ↗
        </p>
      </div>
    </div>
  );
}

function NavSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h2 className="px-3 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}
