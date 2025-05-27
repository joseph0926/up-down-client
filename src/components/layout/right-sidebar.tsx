import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { type ComponentProps, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface DebatePreview {
  id: string;
  title: string;
  thumbnail: string;
  summary: string;
  pro: number;
}

const featured: DebatePreview = {
  id: 'debate-001',
  title: '총선 공약별 효과, 어떻게 판단해야 할까?',
  thumbnail:
    'https://res.cloudinary.com/dahek3ewb/image/upload/ale-4VMrv2rTdrc-unsplash_omoenm.jpg',
  summary:
    '각 정당의 주요 공약이 실제로 구현될 경우 기대·우려되는 사회·경제적 영향을 분석합니다.',
  pro: 0.62,
};

const hotDebates: DebatePreview[] = [
  {
    id: 'debate-002',
    title: '주4일제 시범 도입, 득일까 실일까?',
    thumbnail: '',
    summary: '',
    pro: 0.55,
  },
  {
    id: 'debate-003',
    title: 'AI 규제, 혁신을 막는 걸까?',
    thumbnail: '',
    summary: '',
    pro: 0.48,
  },
  {
    id: 'debate-004',
    title: '부동산 실거래가 공개 확대 필요성',
    thumbnail: '',
    summary: '',
    pro: 0.71,
  },
];

const factNuggets = [
  {
    id: 'fact-01',
    headline: '주4일제 도입 후 생산성 12%↑ (국가인권위 2024)',
    url: '#',
  },
  {
    id: 'fact-02',
    headline: 'AI 규제 법안, 3년간 4건 발의 (국회 의안정보)',
    url: '#',
  },
  {
    id: 'fact-03',
    headline: '공약 이행률 평균 46% (총선 공약평가단 2021)',
    url: '#',
  },
];

const MAX_HISTORY = 5;

export type RightSidebarProps = ComponentProps<'aside'>;

export function RightSidebar({ className, ...rest }: RightSidebarProps) {
  return (
    <aside
      className={cn(
        'sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pb-10',
        className,
      )}
      {...rest}
    >
      <section className="space-y-6">
        <FeaturedDebateCard debate={featured} />
        <LiveGauge debates={hotDebates} />
        <HowItWorks />
        <LocalHistory />
        <FactNuggets facts={factNuggets} />
      </section>
    </aside>
  );
}

function FeaturedDebateCard({ debate }: { debate: DebatePreview }) {
  const [vote, setVote] = useState<'PRO' | 'CON' | null>(null);

  return (
    <article className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <img
        src={debate.thumbnail}
        alt="featured"
        className="h-28 w-full object-cover"
      />
      <div className="space-y-2 p-4">
        <h4 className="line-clamp-2 text-sm leading-tight font-semibold">
          {debate.title}
        </h4>
        <p className="line-clamp-2 text-xs text-zinc-500">{debate.summary}</p>
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => setVote('PRO')}
            className={cn(
              'flex-1 rounded-md py-1.5 text-sm font-medium',
              vote === 'PRO'
                ? 'bg-blue-600 text-white'
                : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700',
            )}
          >
            찬성
          </button>
          <button
            onClick={() => setVote('CON')}
            className={cn(
              'flex-1 rounded-md py-1.5 text-sm font-medium',
              vote === 'CON'
                ? 'bg-red-600 text-white'
                : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700',
            )}
          >
            반대
          </button>
        </div>
      </div>
    </article>
  );
}

function LiveGauge({ debates }: { debates: DebatePreview[] }) {
  const [data, setData] = useState(debates);

  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) =>
        prev.map((d) => {
          const delta = (Math.random() - 0.5) * 0.02;
          let pro = d.pro + delta;
          pro = Math.min(0.9, Math.max(0.1, pro));
          return { ...d, pro };
        }),
      );
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-2 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="text-sm font-semibold">실시간 투표 현황</h3>
      <div className="space-y-3">
        {data.map((d) => (
          <button
            key={d.id}
            className="w-full text-left"
            onClick={() => {
              console.log('scroll to', d.id);
            }}
          >
            <p className="truncate text-xs font-medium text-zinc-700 dark:text-zinc-300">
              {d.title}
            </p>
            <div className="relative h-2 overflow-hidden rounded-sm bg-zinc-200 dark:bg-zinc-800">
              <motion.div
                layout
                style={{ width: `${d.pro * 100}%` }}
                className="h-full bg-blue-500"
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function HowItWorks() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold"
      >
        토론 이용 가이드
        {open ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="space-y-2 overflow-hidden px-4 pb-4 text-xs text-zinc-600 dark:text-zinc-300"
          >
            <p>① 관심 이슈를 찾아 찬·반 의견을 살펴보세요.</p>
            <p>
              ② 찬성·반대 버튼으로 간단히 입장 표시, 댓글로 근거를 남길 수
              있습니다.
            </p>
            <p>
              ③ 토론을 새로 만들 때는 제목만 입력해도 AI가 요약을 도와줍니다.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LocalHistory() {
  const [history, setHistory] = useState<
    { id: string; title: string; ts: number }[]
  >([]);

  useEffect(() => {
    const raw = localStorage.getItem('viewedDebates');
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as {
          id: string;
          title: string;
          ts: number;
        }[];
        setHistory(parsed.slice(0, MAX_HISTORY));
      } catch (err) {
        console.error(err);
      }
    } else {
      setHistory([
        {
          id: 'debate-005',
          title: '재난 지원금, 지속 가능할까?',
          ts: Date.now() - 86400000,
        },
        {
          id: 'debate-006',
          title: '디지털세 도입, 찬반은?',
          ts: Date.now() - 43200000,
        },
      ]);
    }
  }, []);

  if (history.length === 0) return null;

  return (
    <div className="space-y-2 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="text-sm font-semibold">최근에 본 토론</h3>
      <ul className="space-y-1 text-xs">
        {history.map((h) => (
          <li
            key={h.id}
            className="cursor-pointer truncate rounded-md px-2 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            onClick={() => console.log('navigate to', h.id)}
          >
            {h.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FactNuggets({
  facts,
}: {
  facts: { id: string; headline: string; url: string }[];
}) {
  return (
    <div className="space-y-2 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="text-sm font-semibold">팩트 체크 레포트</h3>
      <ul className="space-y-1 text-xs">
        {facts.map((f) => (
          <li key={f.id} className="flex items-start gap-1.5">
            <ExternalLink className="mt-0.5 h-3 w-3 shrink-0 text-zinc-400" />
            <a
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate hover:underline"
            >
              {f.headline}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
