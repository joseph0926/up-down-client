import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { fetchDebate } from '@/services/debate.service';

export default async function DebateDetail({
  params,
}: {
  params: { id: string };
}) {
  const data = await fetchDebate(params.id).catch(() => null);
  if (!data) return notFound();

  const CommentStream = dynamic(
    () => import('@/components/debate/comment-stream'),
    { ssr: false },
  );

  return (
    <article className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold">{data.title}</h1>
        <p className="text-muted-foreground text-sm">
          마감 {new Date(data.deadline).toLocaleDateString()}
        </p>
      </header>

      <section dangerouslySetInnerHTML={{ __html: data.content ?? '' }} />
      <VoteButtons debate={data} />
      <CommentStream debateId={data.id} />
    </article>
  );
}

const VoteButtons = dynamic(() => import('@/components/debate/vote-buttons'), {
  ssr: false,
});
