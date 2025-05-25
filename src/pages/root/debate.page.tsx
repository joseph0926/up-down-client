import 'dayjs/locale/ko';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { Comments } from '@/components/debate/comments';
import { OptionCard } from '@/components/debate/option-card';
import { DebateDetailError } from '@/components/state/debate/debate.error';
import { DebateDetailLoading } from '@/components/state/debate/debate.loading';
import { QUERY_KEY } from '@/lib/query-key';
import { getDebateDetail } from '@/services/debate.service';

dayjs.extend(relativeTime);

export function DebateDetailPage() {
  const { debateId } = useParams<{ debateId: string }>();
  const nav = useNavigate();

  const {
    data: debate,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEY.DEBATES.DETAIL(debateId),
    queryFn: () => getDebateDetail(debateId!),
    enabled: !!debateId,
    staleTime: Infinity,
  });

  if (isLoading) return <DebateDetailLoading />;
  if (isError || !debate) return <DebateDetailError onRetry={refetch} />;

  const totalVotes = debate.proCount + debate.conCount;

  return (
    <div className="mx-auto max-h-screen max-w-3xl space-y-8 overflow-y-auto pt-6 pr-8 pb-24 pl-4">
      <button
        onClick={() => nav(-1)}
        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        <ArrowLeft className="h-4 w-4" /> 목록으로
      </button>
      <h1 className="text-center text-2xl leading-snug font-bold md:text-3xl">
        {debate.title}
      </h1>
      <p className="text-center text-sm text-zinc-600 dark:text-zinc-300">
        마감 {dayjs(debate.deadline).locale('ko').fromNow()}
      </p>
      <div className="grid grid-cols-2 gap-4">
        <OptionCard
          side="pro"
          label="찬성"
          ratio={debate.proRatio}
          votes={debate.proCount}
          summary={debate.content ?? ''}
        />
        <OptionCard
          side="con"
          label="반대"
          ratio={debate.conRatio}
          votes={debate.conCount}
          summary={debate.content ?? ''}
        />
      </div>
      <div className="relative flex items-center gap-4">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
          <div
            className="h-full bg-blue-500"
            style={{ width: `${debate.proRatio * 100}%` }}
          />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-zinc-100 bg-green-600 text-white shadow-md dark:border-zinc-800 dark:bg-green-700">
            <span className="text-sm font-bold">{totalVotes}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between text-xs font-medium text-zinc-600 dark:text-zinc-400">
        <span>
          {debate.proCount}표 · {(debate.proRatio * 100).toFixed(0)}%
        </span>
        <span>
          {(debate.conRatio * 100).toFixed(0)}% · {debate.conCount}표
        </span>
      </div>
      <Comments />
    </div>
  );
}
