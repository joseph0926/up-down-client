import type { TDebateDetail } from '@/types/debate.type';
import { PercentBar } from '@/components/home/percent-bar';

export function DetailBody({ data }: { data: TDebateDetail }) {
  const total = data.proCount + data.conCount;
  const ratio = total ? (data.proCount / total) * 100 : 0;
  const dDay = Math.ceil(
    (new Date(data.deadline).getTime() - Date.now()) / 86_400_000,
  );

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">{data.title}</h1>
        <div className="text-muted-foreground flex gap-4 text-sm">
          <span>🔥 {data.hotScore.toFixed(1)}</span>
          <span>D{dDay > 0 ? `-${dDay}` : '+1'}</span>
          <span>조회 {data.viewCount}</span>
          {/* <span>댓글 {data.commentCount}</span> */}
        </div>
      </header>
      {/* <PercentBar percent={ratio} /> */}
      {data.content && (
        <article
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      )}
    </div>
  );
}
