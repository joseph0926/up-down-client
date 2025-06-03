import 'dayjs/locale/ko';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { CommentForm } from '@/components/debate/comment-form';
import { Comments } from '@/components/debate/comments';
import { OptionCard } from '@/components/debate/option-card';
import { DebateDetailError } from '@/components/state/debate/debate.error';
import { DebateDetailLoading } from '@/components/state/debate/debate.loading';
import { QUERY_KEY } from '@/lib/query-key';
import { cn } from '@/lib/utils';
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

  const isTie = debate.proRatio === debate.conRatio;
  const leading = isTie
    ? null
    : debate.proRatio > debate.conRatio
      ? { side: 'pro', label: '찬성 우세', color: 'blue' }
      : { side: 'con', label: '반대 우세', color: 'red' };

  const totalVotes = debate.proCount + debate.conCount;

  return (
    <div className="max-h-screen space-y-8 overflow-y-auto pt-6 pr-4 pb-24 pl-2 md:pr-8 md:pl-4">
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
      <div className="relative flex items-center">
        <div
          className="h-2 flex-1 overflow-hidden rounded-full"
          style={{
            background: `linear-gradient(
        to right,
        #3b82f6 0%,                      
        #3b82f6 ${debate.proRatio * 100}%, 
        #ef4444 ${debate.proRatio * 100}%, 
        #ef4444 100%                       
      )`,
          }}
        />
        <div className="absolute top-1/2 left-1/2 my-2 -translate-x-1/2 -translate-y-1/2">
          <div
            className={cn(
              'flex h-20 w-20 flex-col items-center justify-center rounded-full border-4 bg-white shadow-md dark:border-zinc-700',
              leading
                ? leading.color === 'blue'
                  ? 'border-blue-500 text-blue-700'
                  : 'border-red-500 text-red-700'
                : 'border-zinc-300 text-zinc-700',
            )}
          >
            <span className="text-[10px] leading-none font-semibold">
              {isTie ? '동률' : leading!.label}
            </span>
            <span className="text-xl font-extrabold">
              {totalVotes.toLocaleString()}
            </span>
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
      <CommentForm />
      <Comments />
    </div>
  );
}
