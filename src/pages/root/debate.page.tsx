import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ArrowLeft } from 'lucide-react';
import { CommentItem } from '@/components/debate/comment-item';
import { OptionCard } from '@/components/debate/option-card';

dayjs.extend(relativeTime);

const dummy = {
  id: 'debate-carbon-tax',
  title: '탄소세 확대, 효과 있을까?',
  description:
    '탄소세를 확대하면 기후 위기 대응에 도움이 된다는 주장과, 산업 경쟁력 저하를 우려하는 반대 의견이 맞서고 있습니다.',
  deadline: '2025-06-05T15:00:00.000Z',
  pro: {
    label: '찬성',
    ratio: 0.58,
    votes: 580,
    summary:
      '탄소세는 온실가스 배출 비용을 내부화해 기업의 친환경 투자를 촉진합니다.',
    icon: '/icons/thumb-up.svg',
  },
  con: {
    label: '반대',
    ratio: 0.42,
    votes: 420,
    summary:
      '제조업 중심의 중소기업 부담이 커져 고용 감소·물가 상승이 우려됩니다.',
    icon: '/icons/thumb-down.svg',
  },
  comments: [
    {
      id: 'c1',
      user: '이민지',
      side: 'pro' as const,
      content:
        '탄소세 수입을 재생에너지 보조금으로 돌리면 일자리도 늘어납니다.',
      likes: 134,
      dislikes: 15,
      createdAt: '2025-05-20T09:20:00Z',
    },
    {
      id: 'c2',
      user: '박준혁',
      side: 'con' as const,
      content: '국내 기업만 비용을 지면 해외 경쟁력이 약화돼 역효과가 납니다.',
      likes: 96,
      dislikes: 22,
      createdAt: '2025-05-20T10:05:00Z',
    },
    {
      id: 'c3',
      user: '정수아',
      side: 'pro' as const,
      content: 'EU CBAM(탄소국경조정제) 대비에도 도움이 되는 정책이라고 봐요.',
      likes: 88,
      dislikes: 9,
      createdAt: '2025-05-21T03:12:00Z',
    },
    {
      id: 'c4',
      user: '김성훈',
      side: 'con' as const,
      content: '세금 인상은 소비자 가격에 전가되어 서민 부담만 늘어납니다.',
      likes: 77,
      dislikes: 30,
      createdAt: '2025-05-21T05:30:00Z',
    },
  ],
};

export function DebatePage() {
  const totalVotes = dummy.pro.votes + dummy.con.votes;
  const proComments = dummy.comments.filter((c) => c.side === 'pro');
  const conComments = dummy.comments.filter((c) => c.side === 'con');

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-6">
      <button className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200">
        <ArrowLeft className="h-4 w-4" /> 목록으로
      </button>

      <h1 className="text-center text-2xl leading-snug font-bold md:text-3xl">
        {dummy.title}
      </h1>
      <p className="text-center text-sm text-zinc-600 dark:text-zinc-300">
        마감 {dayjs(dummy.deadline).fromNow()}
      </p>

      <div className="grid grid-cols-2 gap-4">
        <OptionCard side="pro" {...dummy.pro} />
        <OptionCard side="con" {...dummy.con} />
      </div>

      <div className="relative flex items-center gap-4">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
          <div
            className="h-full bg-blue-500"
            style={{ width: `${dummy.pro.ratio * 100}%` }}
          />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-zinc-100 bg-green-600 text-white shadow-md">
            <span className="text-sm font-bold">{totalVotes}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between text-xs font-medium text-zinc-600 dark:text-zinc-400">
        <span>
          {dummy.pro.votes}표 · {(dummy.pro.ratio * 100).toFixed(0)}%
        </span>
        <span>
          {(dummy.con.ratio * 100).toFixed(0)}% · {dummy.con.votes}표
        </span>
      </div>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          {proComments.map((c) => (
            <CommentItem key={c.id} {...c} />
          ))}
        </div>
        <div className="space-y-6">
          {conComments.map((c) => (
            <CommentItem key={c.id} {...c} />
          ))}
        </div>
      </section>
    </div>
  );
}
